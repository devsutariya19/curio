export type DocNode = {
  name: string;
  slug: string[];
  children?: DocNode[];
  isFile: boolean;
};