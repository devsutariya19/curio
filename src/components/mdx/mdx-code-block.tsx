'use client';

import React from 'react';
import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PreProps{
  children: React.ReactNode;
  'data-title'?: string;
  [key: string]: any;
}

interface CodeProps{
  className?: string;
  children: React.ReactNode;
  [key: string]: any;
}

export function MdxPre({ children, ...props }: PreProps) {
  const [copied, setCopied] = React.useState(false);
  const preRef = React.useRef<HTMLPreElement>(null);

  const codeElement = React.Children.toArray(children)[0] as React.ReactElement<any>;

  const isCodeBlock =
    codeElement?.props?.hasOwnProperty('data-language') ||
    codeElement?.props?.className?.startsWith('language-');

  const copy = () => {
    if (preRef.current) {
      navigator.clipboard.writeText(preRef.current.innerText).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }).catch(err => {
        console.error("Failed to copy text: ", err);
      });
    }
  };

  if (!isCodeBlock) {
    return (
      <div className="bg-gray-800 rounded-lg my-4 flex flex-row justify-between items-center">
        <pre ref={preRef} className="p-4 overflow-x-auto w-full whitespace-pre-wrap" {...props}>
          {children}
        </pre>
        <div className="flex items-center gap-x-3 px-4 py-2">
          {copied && <span className="text-xs">Copied!</span>}
          <Button variant="ghost" onClick={copy} className="p-1 text-gray-300 hover:text-white" aria-label="Copy code">
            {copied ? <Check size={16} /> : <Copy size={16} />}
          </Button>
        </div>
      </div>
    );
  }

  let language = 'text';
  if (codeElement.props['data-language']) {
    language = codeElement.props['data-language'];
  } else if (codeElement.props.className?.startsWith('language-')) {
    language = codeElement.props.className.replace('language-', '');
  }

  const title = props['data-title'];

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden my-4">
      <div className="flex justify-between items-center px-4 py-2 bg-gray-700">
        <span className="text-gray-200 text-sm font-mono">{title || language}</span>
        <div className="flex items-center gap-x-3">
          {copied && <span className="text-xs text-emerald-400">Copied!</span>}
          <Button variant="ghost" onClick={copy} className="p-1 text-gray-300 hover:text-white" aria-label="Copy code">
            {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
          </Button>
        </div>
      </div>
      
      <pre ref={preRef} className="p-4 text-sm overflow-x-auto whitespace-pre-wrap" {...props}>
        {children}
      </pre>
    </div>
  );
}

export function MdxCode({ className, children, ...props }: CodeProps) {
  const isBlock = props.hasOwnProperty('data-language') || className?.startsWith('language-');
  
  if (isBlock) {
    return <code className={className} {...props}>{children}</code>;
  }

  return (
    <code className="bg-gray-800 text-emerald-400 text-sm px-1 py-0.5 rounded" {...props}>
      {children}
    </code>
  );
}