import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { NavFooter } from "@/components/sidebar/nav-footer"
import { NavHeader } from "@/components/sidebar/nav-header"
import { NavMain } from "@/components/sidebar/nav-main"
import { getDocsTree } from "@/lib/docs-tree";

export default async function AppSidebar() {
  const docsTree = await getDocsTree();
  return (
    <Sidebar variant="inset" className="bg-gray-900 backdrop-blur-sm border-r border-gray-800">
      <SidebarHeader className="hidden lg:flex">
        <NavHeader/>
      </SidebarHeader>
      <SidebarContent className="mt-5 lg:mt-0">
        <NavMain docsTree={docsTree} />
      </SidebarContent>
      <SidebarFooter>
        <NavFooter/>
      </SidebarFooter>
    </Sidebar>
  )
}