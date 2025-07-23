import Navbar from '@/components/navbar'
import AppSidebar from '@/components/sidebar/app-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import React, { ReactNode } from 'react'

export default function DocLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar/>
      <SidebarInset>
        <div className="bg-gray-900 overscroll-none">
          <div className="pointer-events-none fixed inset-0 z-0 min-h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:36px_36px] bg-[position:0_0] bg-repeat"></div>
          <main>
            <Navbar className='lg:hidden fixed top-0 w-full z-50'/>
            <div className="px-8 lg:px-12 lg:my-5 my-25 z-10">
              {children}
            </div>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
