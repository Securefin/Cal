
"use client";

import React, { useState, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowRight, Search, CheckCircle, HelpCircle } from "lucide-react";
import Link from "next/link";
import { calculatorCategories } from '@/lib/calculator-data';
import * as LucideIcons from 'lucide-react';
import type { LucideProps } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import type { Metadata } from 'next';

// Note: In App Router, metadata should be in layout.tsx or page.tsx at the top level, not in the component itself.
// Since this is the root page, its metadata is handled by the root layout.tsx.
// We can, however, define page-specific metadata if this wasn't the root.
// For demonstration, if this were a sub-page, it would look like this:
/*
export const metadata: Metadata = {
  title: 'CalcPro - Advanced Calculators for Everyday Needs',
  description: 'A comprehensive suite of advanced calculators to solve your daily math, finance, health, and science problems. Free, fast, and easy to use.',
  alternates: {
    canonical: '/app',
  },
  openGraph: {
    title: 'CalcPro - Advanced Calculators for Everyday Needs',
    description: 'A comprehensive suite of advanced calculators to solve your daily math, finance, health, and science problems. Free, fast, and easy to use.',
    url: '/app',
  },
};
*/


const getIcon = (iconName?: string): React.ComponentType<LucideProps> => {
  if (!iconName) return LucideIcons.Calculator;
  const Icon = LucideIcons[iconName as keyof typeof LucideIcons] as React.ComponentType<LucideProps> | undefined;
  return Icon || LucideIcons.Calculator;
};


const allCalculators = calculatorCategories.flatMap(category => 
  category.calculators.filter(calc => calc.isImplemented)
);

const SearchableToolsGrid = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCalculators = useMemo(() => {
    if (!searchTerm) {
      return allCalculators;
    }
    return allCalculators.filter(tool =>
      tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <section id="tools" className="py-20 md:py-24">
      <div className="mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Explore Our Tools</h2>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
          Find the perfect calculator for your needs.
        </p>
        <div className="mt-8 max-w-lg mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for a calculator..."
              className="w-full pl-10 py-3 rounded-full text-base h-12"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search for a calculator"
            />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCalculators.map((tool) => {
          const ToolIcon = getIcon(tool.iconName);
          return (
            <Card key={`${tool.slug}-${tool.name}`} className="group flex flex-col bg-card/80 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 border border-primary/20">
                   <ToolIcon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{tool.name}</CardTitle>
                <CardDescription className="min-h-[40px]">{tool.description || 'A useful calculation tool.'}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-end">
                 <Button asChild variant="secondary" className="w-full mt-4 bg-secondary/80 hover:bg-secondary transition-colors">
                  <Link href={`/calculators/${tool.slug}`}>
                    Use Now
                    <ArrowRight className="ml-2 h-4 w-4 transform transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )
        })}
         {filteredCalculators.length === 0 && (
          <div className="md:col-span-2 lg:col-span-3 text-center py-16">
            <p className="text-muted-foreground text-lg">No tools found for "{searchTerm}".</p>
          </div>
        )}
      </div>
    </section>
  );
};

const WhyChooseUs = () => (
  <section className="py-20 md:py-24 bg-muted/50">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Why Choose CalcPro?</h2>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
          Accurate, fast, and free online calculators for every need.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {[
          { title: "Completely Free", description: "No hidden fees or premium versions. All our tools, from the basic calculator to the financial calculators, are free to use.", icon: "CheckCircle" },
          { title: "No Sign-Up Required", description: "Get instant access to every calculator without the hassle of creating an account. Your privacy is paramount.", icon: "CheckCircle" },
          { title: "Wide Range of Tools", description: "From health and fitness calculators like BMI and BMR to advanced scientific and financial tools, we have you covered.", icon: "CheckCircle" },
        ].map((feature) => {
           const FeatureIcon = getIcon(feature.icon);
           return(
            <div key={feature.title} className="p-6">
                <FeatureIcon className="h-10 w-10 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="mt-2 text-muted-foreground">{feature.description}</p>
            </div>
        )})}
      </div>
    </div>
  </section>
);

const FaqSection = () => (
  <section className="py-20 md:py-24">
    <div className="container mx-auto px-4 max-w-3xl">
       <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Frequently Asked Questions</h2>
       </div>
       <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Are the calculators on CalcPro free to use?</AccordionTrigger>
          <AccordionContent>
            Yes, absolutely. All calculators and tools on our website are 100% free to use. There are no hidden charges, subscription fees, or premium-only features.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Do I need to create an account to use the calculators?</AccordionTrigger>
          <AccordionContent>
            No, you do not need to sign up or create an account. All our tools are accessible to everyone instantly. We value your privacy and convenience.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>How accurate are the financial and health calculators?</AccordionTrigger>
          <AccordionContent>
            Our calculators are built using standard, widely accepted formulas. However, they are intended for informational and educational purposes only and should not be considered a substitute for professional financial or medical advice.
          </AccordionContent>
        </AccordionItem>
       </Accordion>
    </div>
  </section>
);


export default function HomePage() {
  return (
    <>
      <section className="relative text-center py-20 md:py-32 container mx-auto px-4">
        <div className="absolute inset-0 -z-10 bg-grid-slate-700/[0.05] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]"></div>
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 h-2/3 bg-primary/10 rounded-full blur-3xl -z-20" 
          aria-hidden="true"
        ></div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
          The Ultimate Suite of Advanced Calculators
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground">
          From simple math to complex financial analysis, CalcPro provides the tools you need to get the job done, quickly and accurately.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg" className="group w-full sm:w-auto">
            <Link href="/calculators">
              Explore Tools <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
           <Button asChild size="lg" variant="outline" className="group w-full sm:w-auto">
            <Link href="/about">
              About Us
            </Link>
          </Button>
        </div>
      </section>
      
      <div className="container mx-auto px-4">
        <SearchableToolsGrid />
      </div>
      <WhyChooseUs />
      <FaqSection />
    </>
  );
}
