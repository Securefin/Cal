import type { ReactNode } from 'react';
import Link from 'next/link';
import { Lightbulb, Home } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarInset,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
} from '@/components/ui/sidebar';
import { Icons } from '@/components/icons';
import { Header } from './header';
import { Separator } from '@/components/ui/separator';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <Sidebar variant="sidebar" collapsible="icon" side="left">
        <SidebarHeader className="items-center p-4">
          <Link href="/" className="flex items-center gap-2">
            <Icons.Logo className="size-7 text-primary" />
            <span className="text-lg font-semibold">CalcPro</span>
          </Link>
        </SidebarHeader>
        <Separator />
        <SidebarContent className="p-0">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton href="/" tooltip="Home">
                <Home />
                Home
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="/ai-suggestions" tooltip="AI Suggestions">
                <Lightbulb />
                AI Suggestions
              </SidebarMenuButton>
            </SidebarMenuItem>
            {/* Add other calculator categories here as SidebarMenuItem */}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-4">
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} CalcPro</p>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <Header />
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </SidebarInset>
    </>
  );
}
