import fs from 'fs/promises'
import fg from 'fast-glob';
import { DOCS_FOLDER, DOCS_FILE_PATH, FILE_TYPES, SUPABASE_BUCKET, FILE_IGNORE_PATHS, FILE_IGNORE_PREFIX } from '@/lib/constants';
import { createClient } from '@/utils/supabase/server';
import { getFilePathFromSlug } from '@/lib/file-cache';

export async function listLocalFiles() {
  const patterns = FILE_TYPES.map(ext => `**/*.${ext}`);
  const entries = await fg(patterns, { cwd: DOCS_FILE_PATH, onlyFiles: true, ignore: FILE_IGNORE_PATHS});
  return entries;
}

export async function readDocFile(basePath: string): Promise<string | null> {
  for (const ext of FILE_TYPES) {
    const fullPath = `${basePath}.${ext}`;
    
    try {
      const content = await fs.readFile(fullPath, 'utf8');
      return content;
    } catch (error: any) {
      if (error.code !== 'ENOENT') {
        console.error(`Error reading file ${fullPath}:`, error);
      }
    }
  }
  
  console.warn(`No file found for base path: ${basePath}`);
  return null;
}

export async function listStorageFiles(rootFolder: string, currentPrefix = rootFolder): Promise<string[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.storage.from(SUPABASE_BUCKET).list(currentPrefix, {
    limit: 100,
    offset: 0,
  })

  if (error) {
    console.error('Error listing files:', error.message)
    return []
  }

  let files: string[] = []
  for (const item of data ?? []) {
    if (item.name.startsWith(FILE_IGNORE_PREFIX)) continue;

    const itemPath = currentPrefix ? `${currentPrefix}/${item.name}` : item.name

    if (item.metadata === null) {
      const nestedFiles = await listStorageFiles(rootFolder, itemPath)
      files.push(...nestedFiles)
    } else {
      if (FILE_TYPES.some(ext => item.name.endsWith(ext))) {
        const relativePath = itemPath.startsWith(rootFolder + '/')
          ? itemPath.slice(rootFolder.length + 1)
          : itemPath
        files.push(relativePath)
      }
    }
  }

  return files
}

export async function readStorageFile(slug: string): Promise<string | null> {

  const path = await getFilePathFromSlug(slug);
  const fullPath = `${DOCS_FOLDER}/${path}`;

  const supabase = await createClient();
  const { data, error } = await supabase.storage.from(SUPABASE_BUCKET).download(fullPath);

  if (error) {
    console.error(`Error downloading file ${fullPath}:`, error.message);
    return null;
  }

  if (!data) {
    console.warn(`No file found for base path: ${fullPath}`);
    return null;
  }

  const content = await data.text();
  return content;
}
