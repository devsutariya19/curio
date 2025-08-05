"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Book, Check, ChevronsUpDown, GalleryVerticalEnd } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { useState } from "react"

export function VersionSwitcher({ 
  versions, 
  pathTree 
}: {
    versions: string[]
    pathTree: Record<string, any>
}) {
  const router = useRouter()
  const [selectedVersion, setSelectedVersion] = useState(versions[0])

  const handleSelectVersion = (version: string) => {
    setSelectedVersion(version)
    router.push(`/docs/${version}`)
  }

  return (
    <div>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <div className="bg-emerald-800 text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Book className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  {/* <span className="font-medium">Documentation</span> */}
                  <span>{selectedVersion}</span>
                </div>
                <ChevronsUpDown className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-(--radix-dropdown-menu-trigger-width)" align="start">
              {versions.map((version) => (
                <DropdownMenuItem
                  key={version}
                  onSelect={() => handleSelectVersion(version)}
                >
                  {version} {version === selectedVersion && <Check className="ml-auto" />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </div>
  )
}
