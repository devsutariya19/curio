'use client'

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Bookmark, Braces, ChevronRight, FolderClosed } from "lucide-react"
import { DocNode } from "@/models/types"
import { formatTitle, flattenSlug } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

function normalizePath(path: string) {
  return path.replace(/\/+$/, "") || "/"
}

function isNodeActive(node: DocNode, pathname: string) {
  const currentPath = normalizePath(pathname)
  const nodePath = normalizePath(flattenSlug(node.slug))
  return currentPath === nodePath || currentPath.startsWith(`${nodePath}/`)
}

// Renders items inside a SidebarMenuSub (sub-level) using SubItem/SubButton per the shadcn docs
function renderSubItems(nodes: DocNode[], pathname: string, isApi = false): React.ReactNode {
  const folders = nodes.filter((node) => node.children && node.children.length > 0)
  const files = nodes.filter((node) => !node.children || node.children.length === 0)

  return (
    <>
      {files.map((node) => {
        const slugStr = flattenSlug(node.slug)
        const isActive = normalizePath(pathname) === normalizePath(slugStr)
        return (
          <SidebarMenuSubItem key={slugStr}>
            <SidebarMenuSubButton asChild isActive={isActive}>
              <Link href={slugStr}>
                {isApi ? <Braces className="shrink-0" /> : <Bookmark className="shrink-0" />}
                <span>{formatTitle(node.name)}</span>
              </Link>
            </SidebarMenuSubButton>
          </SidebarMenuSubItem>
        )
      })}

      {folders.map((node) => {
        const key = flattenSlug(node.slug)
        const active = isNodeActive(node, pathname)
        return (
          <Collapsible key={key} asChild defaultOpen={active} className="group/collapsible">
            <SidebarMenuSubItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuSubButton>
                  <FolderClosed className="shrink-0" />
                  <span>{formatTitle(node.name)}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuSubButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {renderSubItems(node.children ?? [], pathname, isApi || node.name.toLowerCase().includes('endpoints'))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuSubItem>
          </Collapsible>
        )
      })}
    </>
  )
}

// Renders top-level items inside SidebarMenu using MenuItem/MenuButton per the shadcn docs
function renderTopLevelItems(nodes: DocNode[], pathname: string): React.ReactNode {
  const folders = nodes.filter((node) => node.children && node.children.length > 0)
  const files = nodes.filter((node) => !node.children || node.children.length === 0)

  return (
    <>
      {files.map((node) => {
        const slugStr = flattenSlug(node.slug)
        const isActive = normalizePath(pathname) === normalizePath(slugStr)
        return (
          <SidebarMenuItem key={slugStr}>
            <SidebarMenuButton asChild tooltip={formatTitle(node.name)} isActive={isActive}>
              <Link href={slugStr}>
                <Bookmark className="shrink-0" />
                <span>{formatTitle(node.name)}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        )
      })}

      {folders.map((node) => {
        const key = flattenSlug(node.slug)
        const active = isNodeActive(node, pathname)
        return (
          <Collapsible key={key} asChild defaultOpen={active} className="group/collapsible">
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={formatTitle(node.name)}>
                  <FolderClosed className="shrink-0" />
                  <span>{formatTitle(node.name)}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {renderSubItems(node.children ?? [], pathname, node.name.toLowerCase().includes('endpoints'))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        )
      })}
    </>
  )
}

export function NavMain({ docsTree }: { docsTree: DocNode[] }) {
  const pathname = usePathname()

  return (
    <SidebarGroup>
      <SidebarMenu>{renderTopLevelItems(docsTree, pathname)}</SidebarMenu>
    </SidebarGroup>
  )
}
