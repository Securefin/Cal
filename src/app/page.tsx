import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Calculator, Sigma, Wand2, Sparkles } from "lucide-react";
import Link from "next/link";
import type { Metadata } from 'next';
import { calculatorCategories } from '@/lib/calculator-data';

export const metadata: Metadata = {
  title: 'CalcPro - Your Ultimate Suite of Advanced Calculators',
  description: 'Welcome to CalcPro! Explore a wide range of calculators for math, finance, health, science, and everyday needs. Simplify your calculations today.',
};

export default function HomePage() {
  return (
    <div className="container mx-auto py-8 md:py-12">
      {/* Hero Section */}
      <section className="text-center py-12 md:py-20">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
          The Ultimate Suite of Advanced Calculators
        </h1>
        <p className="mt-4 md:mt-6 max-w-2xl mx-auto text-lg text-muted-foreground">
          From simple math to complex financial analysis, CalcPro provides the tools you need to get the job done, quickly and accurately.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/calculators">
              Explore Tools <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/about">
              About Us
            </Link>
          </Button>
        </div>
      </section>

      {/* Tools Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-8">Our Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {calculatorCategories.flatMap(category => category.calculators).filter(calc => calc.isImplemented).slice(0, 9).map((tool) => (
            <Card key={tool.slug} className="group hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-xl">{tool.name}</CardTitle>
                <CardDescription>{tool.description || 'A useful calculation tool.'}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="secondary" className="w-full bg-accent hover:bg-accent/80 transition-colors">
                  <Link href={`/calculators/${tool.slug}`}>
                    Open
                    <ArrowRight className="ml-2 h-4 w-4 transform transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
         <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg">
              <Link href="/calculators">View All Tools</Link>
            </Button>
          </div>
      </section>
    </div>
  );
}
