
import type { ReactNode } from 'react';
import React from 'react'; // Import React for React.memo
import Link from 'next/link';
import { Lightbulb, Home, Calculator as CalculatorIcon } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarInset,
  SidebarFooter,
} from '@/components/ui/sidebar';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Icons } from '@/components/icons';
import { Header } from './header';
import { Separator } from '@/components/ui/separator';
import { calculatorCategories, type CalculatorCategory, type CalculatorItem } from '@/lib/calculator-data';
import { cn } from '@/lib/utils';


interface MainLayoutProps {
  children: ReactNode;
}

// Memoized component for rendering the calculator navigation accordion
const CalculatorNavigation = React.memo(function CalculatorNavigation() {
  return (
    <Accordion type="multiple" className="w-full px-2 group-data-[collapsible=icon]:px-0">
      {calculatorCategories.map((category: CalculatorCategory) => {
        const CategoryIcon = category.icon;
        return (
          <AccordionItem value={category.name} key={category.name} className="border-none">
            <AccordionTrigger
              className={cn(
                "flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left text-sm font-normal hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 focus-visible:ring-sidebar-ring group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:size-8 group-data-[collapsible=icon]:p-0 [&>svg:last-child]:group-data-[collapsible=icon]:hidden"
              )}
              title={category.name} // Tooltip for icon-only mode
            >
              <div className="flex items-center gap-2 overflow-hidden">
                <CategoryIcon className="size-4 shrink-0 group-data-[collapsible=icon]:size-5" />
                <span className="truncate group-data-[collapsible=icon]:hidden">{category.name}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-0 pb-1 pl-4 group-data-[collapsible=icon]:hidden">
              <SidebarMenu className="mt-1">
                {category.calculators.map((calc: CalculatorItem) => {
                  const CalcItemIcon = calc.icon || CalculatorIcon; // Fallback icon
                  return (
                    <SidebarMenuItem key={calc.slug}>
                      <SidebarMenuButton
                        href={calc.isImplemented ? `/calculators/${calc.slug}` : '#'}
                        tooltip={calc.name}
                        size="sm"
                        className={cn(
                          "font-normal w-full justify-start h-7", // ensure consistent height for sub-items
                          !calc.isImplemented && "opacity-60 cursor-not-allowed"
                        )}
                        disabled={!calc.isImplemented}
                      >
                        <CalcItemIcon className="size-3.5 shrink-0" />
                        <span className="truncate text-xs">{calc.name}</span>
                        {!calc.isImplemented && <span className="ml-auto text-xs text-sidebar-foreground/50">Soon</span>}
                        {calc.isDemo && calc.isImplemented && <span className="ml-auto text-xs text-sidebar-foreground/50">Demo</span>}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
});
CalculatorNavigation.displayName = 'CalculatorNavigation';


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
            <SidebarMenuItem>
               <SidebarMenuButton href="/calculators" tooltip="All Calculators Overview">
                 <CalculatorIcon />
                 All Calculators
               </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>

          <Separator className="my-2" />
          
          <CalculatorNavigation /> {/* Use the memoized component here */}

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
