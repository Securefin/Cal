
import React from 'react';
import Link from "next/link";
import type { Metadata } from 'next';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type LucideIcon,
  type LucideProps,
  ArrowRight
} from "lucide-react";
import * as LucideIcons from 'lucide-react';
import { calculatorCategories } from "@/lib/calculator-data";
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Explore All Calculators',
  description: 'Browse our comprehensive suite of calculators, organized by category: Basic Math, Financial, Health & Fitness, Engineering & Science, and more.',
  openGraph: {
    title: 'Explore All Calculators',
    description: 'Browse our comprehensive suite of calculators, organized by category.',
    url: '/calculators',
  },
};

const getIcon = (iconName?: string): React.ComponentType<LucideProps> => {
  if (!iconName) return LucideIcons.Calculator;
  const Icon = LucideIcons[iconName as keyof typeof LucideIcons] as React.ComponentType<LucideProps> | undefined;
  return Icon || LucideIcons.Calculator;
};


export default function CalculatorsPage() {
  return (
    <div className="container mx-auto py-8 md:py-12 px-4 space-y-12">
      <section className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">All Calculators</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Browse our comprehensive suite of calculators, organized by category. More tools are being added regularly!
        </p>
      </section>

      {calculatorCategories.map((category) => {
        const CategoryIcon = getIcon(category.iconName);
        return (
          <section key={category.name}>
            <div className="flex items-center gap-4 mb-8">
               <CategoryIcon className="h-8 w-8 text-primary" />
               <h2 className="text-3xl font-bold tracking-tight">{category.name}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.calculators.map((calc) => {
                 if (!calc.isImplemented) return null;
                 const CalcIcon = getIcon(calc.iconName);
                 return (
                  <Card key={calc.slug} className="flex flex-col group hover:shadow-xl transition-shadow duration-300">
                    <CardHeader className="flex-grow">
                      <div className="flex items-start gap-4">
                        <CalcIcon className="h-6 w-6 text-primary mt-1" />
                        <div className="flex-1">
                          <CardTitle className="text-xl">{calc.name}</CardTitle>
                          <CardDescription className="mt-2">{calc.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                       <Button asChild variant="secondary" className="w-full bg-accent/20 hover:bg-accent/40 transition-colors">
                        <Link href={`/calculators/${calc.slug}`}>
                          Open Tool
                          <ArrowRight className="ml-2 h-4 w-4 transform transition-transform group-hover:translate-x-1" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                 );
              })}
            </div>
          </section>
        )
      })}
    </div>
  );
}
