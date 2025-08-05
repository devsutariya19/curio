import * as React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface CodeGroupProps {
  children: React.ReactNode;
}

interface CodeBlock {
  title: string;
  icon?: string;
  element: React.ReactElement;
}

export function MdxCodeGroup({ children }: CodeGroupProps) {
  const codeBlocks = React.Children.toArray(children)
    .map((child) => {

      if (!React.isValidElement(child)) {
        return null;
      }
      
      const props = child.props as { [key: string]: any };
      const titleWithIcon = props['data-title'] || '';
      
      if (titleWithIcon) {
        const [langAndIcon, ...titleParts] = titleWithIcon.split(' ');
        const title = titleParts.join(' ');
        const icon = langAndIcon.includes(':') ? langAndIcon.split(':')[1] : undefined;

        return { title, icon, element: child } as CodeBlock;
      }
      
      return null;
    })
    .filter((block): block is CodeBlock => block !== null);

  if (codeBlocks.length === 0) {
    return <>{children}</>;
  }

  const defaultValue = codeBlocks[0].title;

  return (
    <Tabs defaultValue={defaultValue} className="my-6 not-prose">
      <TabsList className="w-full justify-start rounded-none bg-transparent p-0 border-b">
        {codeBlocks.map((block) => (
          <TabsTrigger
            key={block.title}
            value={block.title}
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none -mb-px"
          >
            {block.title}
          </TabsTrigger>
        ))}
      </TabsList>
      {codeBlocks.map((block) => (
        <TabsContent key={block.title} value={block.title} className="relative">
          <div className="[&>div]:my-0">{block.element}</div>
        </TabsContent>
      ))}
    </Tabs>
  );
}