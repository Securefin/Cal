
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
import { Badge } from "@/components/ui/badge";
import {
  ChevronRight,
  Calculator as DefaultCalculatorIcon,
  type LucideIcon,
} from "lucide-react";
import * as LucideIcons from 'lucide-react'; // Import all icons
import { calculatorCategories, type CalculatorCategory, type CalculatorItem } from "@/lib/calculator-data";

export const metadata: Metadata = {
  title: 'Explore Calculators - CalcPro',
  description: 'Browse our comprehensive suite of calculators, organized by category: Basic Math, Financial, Health & Fitness, Engineering & Science, and more.',
};

// Helper function to get an icon component by name
const getIcon = (iconName?: string, defaultIcon: LucideIcon = DefaultCalculatorIcon): LucideIcon => {
  if (iconName && LucideIcons[iconName as keyof typeof LucideIcons]) {
    return LucideIcons[iconName as keyof typeof LucideIcons];
  }
  return defaultIcon;
};

interface CalculatorCategoryCardProps {
  category: CalculatorCategory;
}

const CalculatorCategoryCardComponent: React.FC<CalculatorCategoryCardProps> = ({ category }) => {
  const CategoryIcon = getIcon(category.iconName, LucideIcons.LayoutGrid); // Default for category card title
  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
      <CardHeader className="bg-muted/30">
        <CardTitle className="flex items-center text-xl text-primary">
          <CategoryIcon className="mr-3 h-6 w-6" />
          {category.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 flex-grow">
        <ul className="space-y-2">
          {category.calculators.map((calc) => {
            const CalcItemIcon = getIcon(calc.iconName, DefaultCalculatorIcon); // Default for calc item
            return (
            <li key={calc.slug}>
              <Link
                href={calc.isImplemented ? `/calculators/${calc.slug}` : `#`}
                className={`flex items-center justify-between p-2 rounded-md hover:bg-accent/50 transition-colors group ${!calc.isImplemented ? 'cursor-not-allowed opacity-70' : ''}`}
                aria-disabled={!calc.isImplemented}
                tabIndex={!calc.isImplemented ? -1 : undefined}
              >
                <div className="flex items-center">
                  { CalcItemIcon && <CalcItemIcon className="mr-2 h-4 w-4 text-muted-foreground group-hover:text-primary" />}
                  <span className="text-foreground/90 group-hover:text-primary">{calc.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  {calc.isDemo && calc.isImplemented && (
                    <Badge variant="outline" className="text-xs border-accent text-accent group-hover:bg-accent group-hover:text-accent-foreground">
                      Demo
                    </Badge>
                  )}
                   {calc.isAdvanced && calc.isImplemented && (
                    <Badge variant="outline" className="text-xs border-accent text-accent group-hover:bg-accent group-hover:text-accent-foreground">
                      Advanced
                    </Badge>
                  )}
                  {!calc.isImplemented && (
                    <Badge variant="outline" className="text-xs border-accent text-accent group-hover:bg-accent group-hover:text-accent-foreground">
                      Soon
                    </Badge>
                  )}
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </Link>
            </li>
          )}
          )}
        </ul>
      </CardContent>
    </Card>
  );
};
CalculatorCategoryCardComponent.displayName = "CalculatorCategoryCardComponent";
const MemoizedCalculatorCategoryCard = React.memo(CalculatorCategoryCardComponent);


export default function CalculatorsPage() {
  return (
    <div className="container mx-auto space-y-8">
      <Card className="shadow-lg border-primary/20">
        <CardHeader>
          <div className="flex items-center space-x-3 mb-2">
            <DefaultCalculatorIcon className="h-10 w-10 text-primary" />
            <CardTitle className="text-4xl font-bold">Explore Calculators</CardTitle>
          </div>
          <CardDescription className="text-lg">
            Browse our comprehensive suite of calculators, organized by category.
            More tools are being added regularly!
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {calculatorCategories.map((category) => (
          <MemoizedCalculatorCategoryCard key={category.name} category={category} />
        ))}
      </div>
    </div>
  );
}
