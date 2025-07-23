import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import React from 'react'
import ResponsiveBreadcrumbs from '@/components/responsive-breadcrumbs'
import { DOCS_PATH } from '@/lib/constants'

export default async function DocPage({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug = [] } = await params
  const filePath = path.join(DOCS_PATH, ...slug)

  let source = ''
  try {
    source = await fs.readFile(filePath + '.mdx', 'utf8')
  } catch {
    try {
      source = await fs.readFile(filePath + '.md', 'utf8')
    } catch {
      return notFound()
    }
  }

const components = {
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
}

  const { content } = matter(source)
  return (
    <div className="mx-auto max-w-screen-sm sm:max-w-full">
      <ResponsiveBreadcrumbs slug={slug} />
      <MDXRemote source={content} components={components}/>
    </div>
  )
}