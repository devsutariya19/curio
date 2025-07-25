import { DocNode } from '@/models/types';
import fg from 'fast-glob';
import { DOCS_PATH, FILE_TYPES } from '@/lib/constants';

type DocNodeInternal = Omit<DocNode, 'children'> & { children?: Record<string, DocNodeInternal> };

export async function getDocsTree(): Promise<DocNode[]> {
  const patterns = FILE_TYPES.map(ext => `**/*.${ext}`);
  const entries = await fg(patterns, { cwd: DOCS_PATH, onlyFiles: true });

  const tree: Record<string, DocNodeInternal> = {};
  const fileExtensionRegex = new RegExp(`\\.(${FILE_TYPES.join('|')})$`);

  for (const entry of entries) {
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