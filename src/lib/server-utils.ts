import fs from 'fs/promises'
import fg from 'fast-glob';
import { DOCS_FOLDER, DOCS_FILE_PATH, MD_FILE_TYPES, SUPABASE_BUCKET, FILE_IGNORE_PATHS, FILE_IGNORE_PREFIX, OPENAPI_FILE_TYPES } from '@/lib/constants';
import { createClient } from '@/utils/supabase/server';
import { getFilePathFromSlug } from '@/lib/file-cache';
import SwaggerParser from '@apidevtools/swagger-parser';
import path from 'path';

/**
 * Lists all local files matching the specified file types.
 * @param fileType - An array of file extensions to filter by.
 * @returns An array of file paths matching the specified file types.
 */
export async function listLocalFiles(filePath: string, fileType: string[]) {
  const patterns = fileType.map(ext => `**/*.${ext}`);
  const entries = await fg(patterns, { cwd: filePath, onlyFiles: true, ignore: FILE_IGNORE_PATHS});
  return entries;
}

/**
 * Reads a document file from the local file system.
 * @param basePath - The base path of the document file without extension.
 * @returns The content of the document file or null if not found.
 */
export async function readDocFile(basePath: string): Promise<string | null> {
  for (const ext of MD_FILE_TYPES) {
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

/**
 * Reads the OpenAPI specification for a given frontmatter.
 * @param frontmatter - The frontmatter object containing metadata about the document.
 * @returns The OpenAPI endpoint information or null if not found.
 */
export async function readOpenApiSpec(frontmatter: any, slug: string[]) {
  const currPath = path.join(DOCS_FILE_PATH, slug[0]);
  const specs = await listLocalFiles(currPath, OPENAPI_FILE_TYPES);
  const spec_path = path.join(currPath, ...specs[0].split('/'));
  const api: any = await SwaggerParser.bundle(spec_path);

  const [method, apiPath] = frontmatter.openapi.split(' ');
  const endpoint = api.paths?.[apiPath]?.[method.toLowerCase()];

  const spec = {
    ...endpoint,
    method: method.toUpperCase(),
    path: apiPath,
    info: endpoint.tags?.[0] ? api.tags?.find((tag: any) => tag.name === endpoint.tags?.[0]) : null,
    url: api.servers?.[0]?.url || ''
  }

  return spec;
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
      if (MD_FILE_TYPES.some(ext => item.name.endsWith(ext))) {
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
