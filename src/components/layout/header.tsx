"use client"
import Link from "next/link"
import { Icons } from "@/components/icons"
import { ThemeToggle } from "@/components/theme-toggle"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Icons.Logo className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block">
              CalcPro
            </span>
          </Link>
        </div>
        
        {/* Mobile Sidebar Trigger */}
        <div className="md:hidden">
           <SidebarTrigger />
        </div>
        
        {/* Mobile Logo (centered when sidebar trigger is on left) */}
        <div className="flex flex-1 items-center justify-center md:hidden">
          <Link href="/" className="flex items-center space-x-2">
            <Icons.Logo className="h-6 w-6 text-primary" />
            <span className="font-bold">CalcPro</span>
          </Link>
        </div>


        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center">
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}
