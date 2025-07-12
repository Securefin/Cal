
"use client"
import React, { useState, useEffect } from "react";
import Link from "next/link"
import { Icons } from "@/components/icons"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/calculators", label: "Tools" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const HeaderComponent = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300",
      isScrolled ? "border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" : "bg-transparent"
    )}>
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Icons.Logo className="h-6 w-6 text-primary" />
            <span className="font-bold">
              MyAIWork
            </span>
          </Link>
          <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} className="transition-colors hover:text-foreground/80 text-foreground/60">{link.label}</Link>
            ))}
          </nav>
        </div>
        
        <div className="flex flex-1 items-center justify-end space-x-2">
          <div className="hidden sm:flex">
             <Button asChild size="sm">
               <Link href="/calculators">Explore Tools</Link>
             </Button>
          </div>
          <ThemeToggle />
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <div className="flex flex-col gap-4 py-6">
                   <Link href="/" className="mr-6 flex items-center space-x-2 mb-4">
                      <Icons.Logo className="h-6 w-6 text-primary" />
                      <span className="font-bold">MyAIWork</span>
                    </Link>
                  {navLinks.map(link => (
                    <Link 
                      key={link.href} 
                      href={link.href} 
                      className="text-lg font-medium transition-colors hover:text-primary"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                   <Button asChild size="sm" className="mt-4">
                      <Link href="/calculators">Explore Tools</Link>
                   </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}

HeaderComponent.displayName = "HeaderComponent";
export const Header = React.memo(HeaderComponent);
