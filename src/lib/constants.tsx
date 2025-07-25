import { MdxCard } from "@/components/mdx/mdx-card";
import { MdxNote } from "@/components/mdx/mdx-note";
import { MdxAccordion, MdxAccordionGroup } from '@/components/mdx/mdx-accordion';
import { MdxIframe } from "@/components/mdx/mdx-iframe";
import { MdxFrame } from "@/components/mdx/mdx-image";
import { MdxInfo } from "@/components/mdx/mdx-info";
import { MdxStep, MdxSteps } from "@/components/mdx/mdx-steps";
import path from "path";
import { MdxCode, MdxPre } from "@/components/mdx/mdx-code-block";

// export const DOCS_PATH = path.join(process.cwd(), 'docs');
export const DOCS_PATH = '/Users/dev/Documents/Projects/mint/starter'
export const FILE_TYPES: string[] = ['mdx', 'md']

export const http = {
  OK: 200,
  BAD_REQUEST: 400,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
}

export const MDX_COMPONENTS = {
  h1: (props: any) => <h1 className="text-4xl font-bold mt-8 mb-4" {...props} />,
  h2: (props: any) => <h2 className="text-3xl font-semibold mt-6 mb-3" {...props} />,
  h3: (props: any) => <h3 className="text-2xl font-semibold mt-4 mb-2" {...props} />,
  hr: (props: any) => <hr className="border-t-2 border-gray-300 my-6" {...props} />,
  p: (props: any) => <p className="mt-4 leading-relaxed" {...props} />,
  ul: (props: any) => <ul className="list-disc pl-6 space-y-2" {...props}/>,
  ol: (props: any) => <ol className="list-decimal pl-6 space-y-2" {...props}/>,
  blockquote: (props: any) => <blockquote className="border-l-4 pl-4 italic text-gray-600" {...props} />,
  code: MdxCode,
  pre: MdxPre,
  Link: (props: any) => <a className="text-blue-500" {...props} />,
  Card: MdxCard,
  Note: MdxNote,
  AccordionGroup: MdxAccordionGroup,
  Accordion: MdxAccordion,
  Frame: MdxFrame,
  Iframe: MdxIframe,
  Info: MdxInfo,
  Steps: MdxSteps,
  Step: MdxStep,
}
