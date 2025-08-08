import path from 'path'
import ResponsiveBreadcrumbs from '@/components/responsive-breadcrumbs'

import { notFound } from 'next/navigation'
import { bundleMDX } from "mdx-bundler";
import { getMDXComponent } from 'mdx-bundler/client'
import rehypePrettyCode from 'rehype-pretty-code';

import { DOCS_FILE_PATH } from '@/lib/constants'
import { readDocFile, readOpenApiSpec, readStorageFile } from '@/lib/server-utils'

import { MDX_COMPONENTS } from '@/components/mdx/mdx-mappings';
import { Badge } from '@/components/ui/badge';
import { ApiSpec } from '@/components/api-spec';

export default async function DocPage({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug = [] } = await params
  
  // Local File System
  const filePath = path.join(DOCS_FILE_PATH, ...slug)
  const source = await readDocFile(filePath);

  // Supabase Storage
  // const slugStr = slug.join('/');
  // const source = await readStorageFile(slugStr);

  if (source === null) {
    return notFound()
  }

  const { code, frontmatter } = await bundleMDX({
    source: source,
    mdxOptions(options) {
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        [rehypePrettyCode, { 
          theme: 'github-dark-dimmed',
          keepBackground: false,
          onVisitTitle(element: any) {
            const parent = element.parent;
            if (parent && parent.properties) {
              const titleText = element.children[0].value;
              parent.properties['data-title'] = titleText;
            }
          },
        }],
      ];
      
      return options;
    },
  });
  const MdxComponent = getMDXComponent(code)

  let openapi_spec = null
  if (frontmatter.openapi) {
    openapi_spec = await readOpenApiSpec(frontmatter, slug);
    // console.log('OpenAPI Spec:', openapi_spec);
  }
  
  return (
    <div className="mx-auto max-w-screen-sm sm:max-w-full mb-20">
      <div className='flex items-center justify-between mb-4'>
        <ResponsiveBreadcrumbs slug={slug} />
      </div>
      
      <div className='mb-10'>
        <h1 className="text-4xl font-bold text-white border-b border-gray-700 pb-2">
          {openapi_spec?.summary || frontmatter.title || ''}
        </h1>
        <div className="flex flex-row gap-2 items-center mt-2 text-md text-gray-400">
          {openapi_spec?.method && (
            <Badge className='bg-emerald-900 text-emerald-400'>{openapi_spec.method}</Badge>
          )}

          {openapi_spec?.url ? (
            <p>
              <span className='text-gray-300'>{openapi_spec?.url}</span>
              <span className='text-gray-500'>{openapi_spec?.path}</span>
            </p>
          ) : (
            <>
              {frontmatter.description || ''}
            </>
          )}
        </div>
      </div>

      {openapi_spec ? (
        <ApiSpec spec={openapi_spec} />
      ) : (
        <MdxComponent components={MDX_COMPONENTS}/>
      )}
    </div>
  )
}