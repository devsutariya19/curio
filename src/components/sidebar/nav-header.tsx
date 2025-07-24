"use client"

import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar"
import { DropdownMenu } from "@/components/ui/dropdown-menu"
import Link from "next/link"

export function NavHeader() {
  return (
    <>
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <SidebarMenuButton 
            size="lg" 
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <Link href="/" className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-white">
                Curio<span className="text-emerald-400">Docs</span>
              </h1>
            </Link>
          </SidebarMenuButton>
        </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </>
  )
}
