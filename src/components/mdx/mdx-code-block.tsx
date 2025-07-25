'use client';

import React from 'react';
import { Copy } from 'lucide-react';

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
  
  if (!isCodeBlock) {
    return <pre className="bg-gray-800 text-white p-4 rounded overflow-x-auto" {...props}>{children}</pre>;
  }
  
  const code = codeElement.props.children as string;
  const language = (codeElement.props.className as string).replace('language-', '');
  
  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden my-4">
      <div className="flex justify-between items-center px-4 py-2 bg-gray-700">
        <span className="text-gray-200 text-sm">{language}</span>
        <button onClick={copy} className="text-gray-200 hover:text-white">
          <Copy size={16} />
        </button>
      </div>
      <pre className="p-4 overflow-x-auto">
        <code className="text-emerald-400 text-sm">{code}</code>
      </pre>
      {copied && (
        <div className="absolute top-2 right-12 bg-emerald-400 text-white text-xs px-2 py-1 rounded">
          Copied!
        </div>
      )}
    </div>
  );
}

export function MdxCode({ className, children, ...props }: CodeProps) {
  if (className?.startsWith('language-')) {
    return <code className={className} {...props}>{children}</code>;
  }
  return <code className="bg-gray-800 text-emerald-400 text-sm px-1 py-0.5 rounded" {...props}>{children}</code>;
}