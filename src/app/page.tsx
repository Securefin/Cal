
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, Calculator } from "lucide-react";
import Link from "next/link";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CalcPro - Your Ultimate Suite of Advanced Calculators',
  description: 'Welcome to CalcPro! Explore a wide range of calculators for math, finance, health, science, and everyday needs. Simplify your calculations today.',
};

export default function HomePage() {
  return (
    <div className="container mx-auto">
      <Card className="w-full shadow-xl">
        <CardHeader className="text-center">
          <div className="mb-4 flex justify-center">
            <Calculator className="h-16 w-16 text-primary" />
          </div>
          <CardTitle className="text-4xl font-bold">Welcome to CalcPro!</CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            Your ultimate suite of advanced calculators for every need.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-6 p-8">
          <p className="max-w-2xl text-center text-foreground/80">
            CalcPro offers a wide range of calculators, from scientific and financial tools to health and engineering problem solvers. Explore our features and simplify your calculations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
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
    </div>
  );
}
