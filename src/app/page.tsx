import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Calculator as DefaultCalculatorIcon } from "lucide-react";
import Link from "next/link";
import type { Metadata } from 'next';
import { calculatorCategories } from '@/lib/calculator-data';
import * as LucideIcons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'CalcPro - Your Ultimate Suite of Advanced Calculators',
  description: 'Welcome to CalcPro! Explore a wide range of calculators for math, finance, health, science, and everyday needs. Simplify your calculations today.',
};

const getIcon = (iconName?: string, defaultIcon: LucideIcon = DefaultCalculatorIcon): LucideIcon => {
  if (iconName && LucideIcons[iconName as keyof typeof LucideIcons]) {
    return LucideIcons[iconName as keyof typeof LucideIcons];
  }
  return defaultIcon;
};

export default function HomePage() {
  return (
    <div className="container mx-auto px-4">
      {/* Hero Section */}
      <section className="relative text-center py-20 md:py-32">
         <div className="absolute top-0 left-0 w-full h-full bg-grid-slate-700/[0.05] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)] -z-10"></div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
          The Ultimate Suite of Advanced Calculators
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground">
          From simple math to complex financial analysis, CalcPro provides the tools you need to get the job done, quickly and accurately.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button asChild size="lg" className="group">
            <Link href="/calculators">
              Explore Tools <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Featured Tools Section */}
      <section className="pb-20">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {calculatorCategories.flatMap(category => category.calculators).filter(calc => calc.isImplemented).slice(0, 9).map((tool) => {
            const ToolIcon = getIcon(tool.iconName);
            return (
              <Card key={tool.slug} className="group relative flex flex-col bg-card/80 backdrop-blur-sm border-white/10 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 border border-primary/20">
                     <ToolIcon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{tool.name}</CardTitle>
                  <CardDescription>{tool.description || 'A useful calculation tool.'}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-end">
                   <Button asChild variant="secondary" className="w-full mt-4 bg-white/5 hover:bg-white/10 transition-colors">
                    <Link href={`/calculators/${tool.slug}`}>
                      Use Now
                      <ArrowRight className="ml-2 h-4 w-4 transform transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
        <div className="text-center mt-16">
            <Button asChild variant="outline" size="lg">
              <Link href="/calculators">View All Tools</Link>
            </Button>
          </div>
      </section>
    </div>
  );
}
