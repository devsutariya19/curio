import NodeCache from 'node-cache';
import { DOCS_FOLDER } from '@/lib/constants';
import { listStorageFiles } from '@/lib/server-utils';

const cache = new NodeCache({ stdTTL: 60 * 10 }); // Cache for 10 minutes
let fileMap: Record<string, string> = {};

export async function getCachedStorageFiles(): Promise<string[]> {
  const key = DOCS_FOLDER;
  const cached = cache.get<string[]>(key);
  if (cached) {
    return cached;
  }

  const filesList = await listStorageFiles(DOCS_FOLDER);
  cache.set(key, filesList);

  fileMap = Object.fromEntries(
    filesList.map((fullPath) => {
      const slug = fullPath.replace(/\.(mdx|md)$/, '').toLowerCase();
      return [slug, fullPath];
    })
  );

  return filesList;
}

export async function getFilePathFromSlug(slug: string): Promise<string> {
  await getCachedStorageFiles();
  return fileMap[slug.toLowerCase()];
} 