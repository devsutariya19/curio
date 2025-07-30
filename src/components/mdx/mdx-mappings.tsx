import { MdxAccordionGroup, MdxAccordion } from "@/components/mdx/mdx-accordion";
import { MdxCard } from "@/components/mdx/mdx-card";
import { MdxCode, MdxPre } from "./mdx-code-block";
import { MdxColumns } from "@/components/mdx/mdx-columns";
import { MdxIframe } from "@/components/mdx/mdx-iframe";
import { MdxFrame } from "@/components/mdx/mdx-image";
import { MdxInfo } from "@/components/mdx/mdx-info";
import { MdxNote } from "@/components/mdx/mdx-note";
import { MdxSteps, MdxStep } from "@/components/mdx/mdx-steps";
import { MdxWarning } from "@/components/mdx/mdx-warning";

// MDX components mapping
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
  CodeGroup: MdxCode,
  Link: (props: any) => <a className="text-blue-500" {...props} />,
  Card: MdxCard,
  CardGroup: MdxColumns,
  Columns: MdxColumns,
  Note: MdxNote,
  Tip: MdxNote,
  Info: MdxInfo,
  Warning: MdxWarning,
  AccordionGroup: MdxAccordionGroup,
  Accordion: MdxAccordion,
  Frame: MdxFrame,
  Iframe: MdxIframe,
  Steps: MdxSteps,
  Step: MdxStep,
}