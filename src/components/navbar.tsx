import {ArrowRight } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export default function Navbar({className}: {className?: string}) {
  return (
    <>
      <header className={cn(
          "bg-gray-900/80 backdrop-blur-sm z-50",
          className
      )}>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/">
            <h1 className="text-2xl font-bold text-white">
              Curio<span className="text-emerald-400">Docs</span>
            </h1>
          </Link>
          <nav className="flex items-center space-x-4">
            {/* <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-gray-800">
              Sign In
            </Button> */}

            <Link href="/docs">
              <Button className="bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg">
                Docs <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </nav>
        </div>
        <div className="h-[1px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent"></div>
      </header>
    </>
  )
}