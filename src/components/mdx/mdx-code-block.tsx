'use client';

import React from 'react';
import { Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PreProps {
  children: React.ReactNode;
  [key: string]: any;
}

interface CodeProps {
  className?: string;
  children: React.ReactNode;
  [key: string]: any;
}

export function MdxPre({ children, ...props }: PreProps) {
  const [copied, setCopied] = React.useState(false);
  
  const codeElement = React.Children.toArray(children)[0] as React.ReactElement<any>;
  const isCodeBlock = codeElement?.props?.className?.startsWith('language-');
  
  // if (!isCodeBlock) {
  //   return (
  //     <pre className="bg-gray-800 text-white p-4 my-2 rounded-2xl overflow-x-auto" {...props}>{children}</pre>
  //   )
  // }
  
  // const code = codeElement.props.children as string;
  // const language = (codeElement.props.className as string).replace('language-', '');
  
  const copy = () => {
    const textToCopy = isCodeBlock ? codeElement.props.children : children;
    navigator.clipboard.writeText(textToCopy as string);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gray-800 rounded-lg overflow-auto my-4">
      {isCodeBlock && (
        <div className="flex justify-between items-center px-4 py-2 bg-gray-700">
          <span className="text-gray-200 text-sm">
            {(codeElement.props.className as string).replace('language-', '')}
          </span>
          <Button variant="ghost" size="icon" onClick={copy} className="p-1 bg-none">
            <Copy />
          </Button>
        </div>
      )}
      
      <div className='flex flex-row justify-between items-center'>
        <pre className="p-4 overflow-x-auto whitespace-pre-wrap">
          {isCodeBlock ? (
            <code className="text-emerald-400 text-sm">{codeElement.props.children}</code>
          ) : (
            children
          )}
        </pre>
        
        {!isCodeBlock && (
          <div className="px-4 py-2">
            <Button variant="ghost" size="icon" onClick={copy} className="p-1 bg-none hover:bg-gray-700!">
              <Copy />
            </Button>
          </div>
        )}
      </div>
      
      {copied && <div className="text-emerald-400 text-xs px-2 py-1">Copied!</div>}
    </div>
  );
}

export function MdxCode({ className, children, ...props }: CodeProps) {
  if (className?.startsWith('language-')) {
    return <code className={className} {...props}>{children}</code>;
  }
  return <code className="bg-gray-800 text-emerald-400 text-sm px-1 py-0.5 rounded" {...props}>{children}</code>;
}