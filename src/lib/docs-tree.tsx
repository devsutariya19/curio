import { DocNode } from '@/models/types';
import { DOCS_FILE_PATH, MD_FILE_TYPES } from '@/lib/constants';
import { listLocalFiles, listStorageFiles } from '@/lib/server-utils';

import { getCachedStorageFiles } from '@/lib/file-cache';

type DocNodeInternal = Omit<DocNode, 'children'> & { children?: Record<string, DocNodeInternal> };

export async function getDocsTree(): Promise<DocNode[]> {
  const tree: Record<string, DocNodeInternal> = {};
  const fileExtensionRegex = new RegExp(`\\.(${MD_FILE_TYPES.join('|')})$`);

  // Local File System
  const doc_entries = await listLocalFiles(DOCS_FILE_PATH, MD_FILE_TYPES);

  // Supabase Storage
  // const entries = await getCachedStorageFiles();

  for (const entry of doc_entries) {
    const parts = entry.split('/');
    let current = tree;
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i].replace(fileExtensionRegex, '');
      const isFile = i === parts.length - 1;
      if (!current[part]) {
        current[part] = {
          name: part,
          slug: parts.slice(0, i + 1).map(p => p.replace(fileExtensionRegex, '')),
          isFile,
        };
      }
      if (!isFile) {
        if (!current[part].children) current[part].children = {};
        current = current[part].children;
      }
    }
  }

  function toArray(obj: Record<string, DocNodeInternal>): DocNode[] {
    return Object.values(obj)
      .sort((a, b) => a.name.localeCompare(b.name))
      .map(({ isFile, children, ...node }: any) => {
        const hasChildren = children && Object.keys(children).length > 0;
        return {
          ...node,
          children: hasChildren ? toArray(children) : undefined,
        };
      });
  }

  return toArray(tree);
} 