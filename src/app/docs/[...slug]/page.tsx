import path from 'path'
import ResponsiveBreadcrumbs from '@/components/responsive-breadcrumbs'
import matter from 'gray-matter';

import { notFound } from 'next/navigation'
import { bundleMDX } from "mdx-bundler";
import {getMDXComponent} from 'mdx-bundler/client'


import { DOCS_PATH, MDX_COMPONENTS } from '@/lib/constants'
import { readDocFile } from '@/lib/server-utils'

import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

export default async function DocPage({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug = [] } = await params
  const filePath = path.join(DOCS_PATH, ...slug)

  const source = await readDocFile(filePath);

  if (source === null) {
    return notFound()
  }

  const { content, data } = matter(source)
  const {code, frontmatter} = await bundleMDX({
    source: content,
  })
  const MdxComponent = getMDXComponent(code)

  return (
    <div className="mx-auto max-w-screen-sm sm:max-w-full mb-20">
      <div className='flex items-center justify-between mb-4'>
        <ResponsiveBreadcrumbs slug={slug} />
        <div className="flex items-center">
          <Button className="rounded-r-none">
            Copy Page
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="rounded-l-none border-l-0 px-2">
                <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>View as Markdown</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="mb-10">
        {data.title && (
        <h1 className="text-4xl font-bold text-white border-b border-gray-700 pb-2">
          {data.title}
        </h1>
        )}
        {data.description && <p className="mt-2 text-md text-gray-400">{data.description}</p>}
      </div>
      <MdxComponent components={MDX_COMPONENTS}/>
    </div>
  )
}