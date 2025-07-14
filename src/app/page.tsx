
"use client";

import React, { useState, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowRight, Search, Calculator as DefaultCalculatorIcon } from "lucide-react";
import Link from "next/link";
import { calculatorCategories } from '@/lib/calculator-data';
import * as LucideIcons from 'lucide-react';
import type { LucideProps } from 'lucide-react';

const getIcon = (iconName?: string): React.ComponentType<LucideProps> => {
  const Icon = iconName ? LucideIcons[iconName as keyof typeof LucideIcons] : DefaultCalculatorIcon;
  return Icon || DefaultCalculatorIcon; // Fallback to a default icon
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
                <CardTitle className="text-xl">{tool.name}</CardTitle>
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

const Testimonials = () => (
  <section className="py-20 md:py-24 bg-muted/50">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Loved by Professionals</h2>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
          See what our users are saying about CalcPro.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          { name: "Sarah J.", role: "Finance Analyst", quote: "CalcPro's financial calculators are a lifesaver. The Loan EMI and SIP calculators are incredibly accurate and easy to use.", avatar: "https://i.pravatar.cc/150?img=1" },
          { name: "Mike R.", role: "Web Developer", quote: "As a developer, I frequently use the unit and color converters. The clean interface and speed are fantastic. Highly recommended!", avatar: "https://i.pravatar.cc/150?img=2" },
          { name: "Chloe T.", role: "Fitness Coach", quote: "I recommend the BMI and BMR calculators to all my clients. They are simple, intuitive, and provide the essential data we need.", avatar: "https://i.pravatar.cc/150?img=3" },
        ].map((testimonial) => (
          <Card key={testimonial.name} className="p-6 bg-background">
            <CardContent className="p-0">
              <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
              <div className="flex items-center mt-6">
                <Avatar className="h-10 w-10 mr-4">
                  <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                  <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

const BlogSection = () => (
  <section className="py-20 md:py-24">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Insights & Articles</h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            Learn more about the concepts behind our calculators.
          </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: "Understanding Compound Interest", summary: "Learn how the magic of compounding can significantly grow your investments over time with our SIP and FD calculators." },
            { title: "A Guide to Body Mass Index (BMI)", summary: "What is BMI and what does it mean for your health? A deep dive into the simple formula behind our health calculator." },
            { title: "The Science of Color: HEX & RGB", summary: "Explore how developers and designers use different color models and how you can convert between them seamlessly." },
          ].map((post) => (
              <Card key={post.title} className="group flex flex-col hover:-translate-y-1 transition-transform duration-300">
                  <CardHeader>
                      <CardTitle>{post.title}</CardTitle>
                      <CardDescription className="pt-2">{post.summary}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow flex items-end">
                      <Button variant="link" className="p-0 text-primary">
                          Read More <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                  </CardContent>
              </Card>
          ))}
      </div>
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
      <Testimonials />
      <BlogSection />
    </>
  );
}
