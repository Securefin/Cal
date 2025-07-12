import type { ReactNode } from 'react';
import React from 'react';
import Link from 'next/link';
import { Header } from './header';
import { Separator } from '@/components/ui/separator';

interface MainLayoutProps {
  children: ReactNode;
}

const Footer = () => (
  <footer className="border-t">
    <div className="container mx-auto py-6 text-center md:flex md:items-center md:justify-between">
      <p className="text-sm text-muted-foreground">
        © {new Date().getFullYear()} CalcPro. All rights reserved.
      </p>
      <div className="mt-4 flex justify-center space-x-6 md:mt-0">
        <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          Privacy Policy
        </Link>
        <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          Terms of Service
        </Link>
      </div>
    </div>
  </footer>
);


export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
