import { MdxCard } from "@/components/mdx/mdx-card";
import { MdxNote } from "@/components/mdx/mdx-note";
import path from "path";

// export const DOCS_PATH = path.join(process.cwd(), 'docs');
export const DOCS_PATH = '/Users/dev/Documents/Projects/mint/starter'
export const FILE_TYPES: string[] = ['mdx', 'md']

export const http = {
  OK: 200,
  NOT_FOUND: 404,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  BAD_REQUEST: 400
}

export const MDX_COMPONENTS = {
  h1: (props: any) => <h1 className="text-4xl font-bold mt-8 mb-4" {...props} />,
  h2: (props: any) => <h2 className="text-3xl font-semibold mt-6 mb-3" {...props} />,
  h3: (props: any) => <h3 className="text-2xl font-semibold mt-4 mb-2" {...props} />,
  hr: (props: any) => <hr className="border-t-2 border-gray-300 my-6" {...props} />,
  p: (props: any) => <p className="mt-4 leading-relaxed" {...props} />,
  code: (props: any) => <code className="bg-gray-700 text-sm px-1 py-0.5 rounded" {...props} />,
  pre: (props: any) => <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto" {...props} />,
  ul: (props: any) => <ul className="list-disc pl-6 space-y-2" {...props}/>,
  ol: (props: any) => <ol className="list-decimal pl-6 space-y-2" {...props}/>,
  blockquote: (props: any) => <blockquote className="border-l-4 pl-4 italic text-gray-600" {...props} />,
  Link: (props: any) => <a className="text-blue-500" {...props} />,
  Card: MdxCard,
  Note: MdxNote
}
