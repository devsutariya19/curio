import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Accordion,
} from '@/components/ui/accordion';
import { ReactNode } from 'react';

type AccordionGroupProps = {
  children: ReactNode;
};

export function MdxAccordionGroup({ children }: AccordionGroupProps) {
  return (
    <Accordion type="single" collapsible className="w-full bg-accent px-5 rounded-2xl" defaultValue='1'>
      {children}
    </Accordion>
  );
}

type AccordionProps = {
  title: string;
  children: ReactNode;
};

let index = 0;

export function MdxAccordion({ title, children }: AccordionProps) {
  const itemValue = `item-${index++}`;
  return (
    <AccordionItem value={itemValue}>
      <AccordionTrigger>{title}</AccordionTrigger>
      <AccordionContent>{children}</AccordionContent>
    </AccordionItem>
  );
}
