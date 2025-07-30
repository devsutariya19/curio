import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from "@/components/ui/sidebar"
import { Bookmark } from "lucide-react"
import { DocNode } from "@/models/types";
import { formatTitle, flattenSlug } from "@/lib/utils";
import Link from "next/link";
import { headers } from "next/headers";

export function SidebarFolder({ node }: { node: any }) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton tooltip={node.name}>
        <span className="text-md font-bold">{formatTitle(node.name)}</span>
      </SidebarMenuButton>
      <SidebarMenuSub>
        {renderSidebarTree(node.children)}
      </SidebarMenuSub>
    </SidebarMenuItem>
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
              <Link href={slugStr} className="flex items-center gap-2 w-full">
                <Bookmark className="shrink-0" />
                <span>{formatTitle(node.name)}</span>
              </Link>
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

export async function NavMain({docsTree}: {docsTree: any[]}) {
  return (
    <SidebarGroup>
      {renderSidebarTree(docsTree)}
    </SidebarGroup>
  )
  
}
