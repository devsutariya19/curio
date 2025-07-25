import fs from 'fs/promises'
import { FILE_TYPES } from '@/lib/constants';

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