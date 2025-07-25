import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from "@/components/ui/sidebar"
import { Bookmark, ChevronRight} from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { DocNode } from "@/models/types";
import { formatTitle, flattenSlug } from "@/lib/utils";

export function SidebarFolder({ node }: { node: any }) {
  return (
    <Collapsible key={node.name} asChild defaultOpen={true} className="group/collapsible">
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton tooltip={node.name}>
            <span className="text-md font-bold">{formatTitle(node.name)}</span>
            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {renderSidebarTree(node.children)}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
}

export function renderSidebarTree(nodes: DocNode[]) {
  const folders = nodes.filter((node) => node.children && node.children.length > 0)
  const files = nodes.filter((node) => !node.children)

  return (
    <SidebarMenu>
      {files.map((node) => {
        const slugStr = flattenSlug(node.slug)
        return (
          <SidebarMenuItem key={slugStr}>
            <SidebarMenuButton asChild tooltip={formatTitle(node.name)}>
              <a href={slugStr} className="flex items-center gap-2 w-full">
                <Bookmark className="shrink-0" />
                <span>{formatTitle(node.name)}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        )
      })}
      {folders.map((node) => {
        const slugStr = flattenSlug(node.slug)
        return <SidebarFolder key={slugStr} node={node} />
      })}
    </SidebarMenu>
  )
}


export function NavMain({docsTree}: {docsTree: any[]}) {
  return (
    <SidebarGroup>
      {renderSidebarTree(docsTree)}
    </SidebarGroup>
  )
  
}
