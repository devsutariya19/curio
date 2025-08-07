import Navbar from '@/components/navbar'
import AppSidebar from '@/components/sidebar/app-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

export default async function DocLayout({ children }: { children: ReactNode }) {
  // const supabase = await createClient();
  // const {data, error} = await supabase.auth.getUser();
  // const isAuthenticated = data.user !== null;
  // if (error || !isAuthenticated) {
  //   redirect('/login');
  // }

  return (
    <SidebarProvider>
      <AppSidebar/>
      <SidebarInset>
        <div className="bg-gray-900 overscroll-none">
          <main>
            <Navbar className='lg:hidden fixed top-0 w-full z-50'/>
            <div className="px-8 lg:px-12 lg:my-5 my-25 z-10 max-w-screen-2xl mx-auto">
              {children}
            </div>
          </main>
          {/* <div className="pointer-events-none fixed inset-0 z-0 min-h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:36px_36px] bg-[position:0_0] bg-repeat"></div> */}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
