
import type { ReactNode } from 'react';
import React from 'react'; // Import React for React.memo
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, Calculator, Sigma, Wand2, Sparkles, type LucideIcon } from "lucide-react";
import Link from "next/link";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CalcPro - Your Ultimate Suite of Advanced Calculators',
  description: 'Welcome to CalcPro! Explore a wide range of calculators for math, finance, health, science, and everyday needs. Simplify your calculations today.',
};

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

// Memoize FeatureCard
const FeatureCardComponent: React.FC<FeatureCardProps> = ({ icon: Icon, title, description }) => (
  <Card className="text-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out h-full flex flex-col">
    <div className="mb-4 flex justify-center">
      <Icon className="h-12 w-12 text-primary" />
    </div>
    <CardTitle className="text-xl mb-2">{title}</CardTitle>
    <CardDescription className="text-foreground/80 flex-grow">{description}</CardDescription>
  </Card>
);
FeatureCardComponent.displayName = "FeatureCardComponent";
const FeatureCard = React.memo(FeatureCardComponent);


export default function HomePage() {
  return (
    <div className="container mx-auto py-8 md:py-12 lg:py-16 space-y-12 md:space-y-16">
      {/* Hero Section */}
      <Card className="w-full shadow-xl overflow-hidden">
        <CardHeader className="text-center pt-8 md:pt-12">
          <div className="mb-4 flex justify-center">
            <Calculator className="h-16 w-16 text-primary" />
          </div>
          <CardTitle className="text-4xl lg:text-5xl font-bold">Welcome to CalcPro!</CardTitle>
          <CardDescription className="text-lg text-muted-foreground mt-2">
            Your ultimate suite of advanced calculators for every need.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-6 px-6 py-8 md:px-8 md:py-10">
          <p className="max-w-2xl text-center text-base md:text-lg text-foreground/80">
            CalcPro offers a diverse collection of tools, from scientific and financial calculators to health and engineering problem solvers. Explore our features and simplify your calculations with ease.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Button asChild size="lg">
              <Link href="/ai-suggestions">
                <Lightbulb className="mr-2 h-5 w-5" />
                Try AI Suggestions
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/calculators">
                <Calculator className="mr-2 h-5 w-5" />
                Explore Calculators
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Why Choose CalcPro Section */}
      <section className="text-center">
        <h2 className="text-3xl font-bold mb-8 text-foreground">Why Choose CalcPro?</h2>
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          <FeatureCard 
            icon={Sigma} 
            title="Vast Collection" 
            description="Access a comprehensive library of calculators, from basic arithmetic to specialized scientific, financial, and health tools, all in one place." 
          />
          <FeatureCard 
            icon={Wand2} 
            title="AI-Powered Assistance" 
            description="Stuck on a problem? Our AI can suggest relevant formulas and functions, guiding you to the right solution efficiently." 
          />
          <FeatureCard 
            icon={Sparkles} 
            title="Clean & Intuitive" 
            description="Navigate with ease. CalcPro offers a modern, user-friendly, and responsive interface, ensuring a seamless experience on any device." 
          />
        </div>
      </section>
    </div>
  );
}
