import path from 'path'
import matter from 'gray-matter'
import ResponsiveBreadcrumbs from '@/components/responsive-breadcrumbs'

import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'

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

  const { content } = matter(source)
  return (
    <div className="mx-auto max-w-screen-sm sm:max-w-full">
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
      <MDXRemote source={content} components={MDX_COMPONENTS}/>
    </div>
  )
}