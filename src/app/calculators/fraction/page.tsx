"use client";
import dynamic from 'next/dynamic';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DivideSquare } from "lucide-react";
// Metadata is now in layout.tsx

const FractionCalculatorComponent = dynamic(() => import('./components/fraction-calculator').then(mod => mod.FractionCalculator), {
  ssr: false,
  loading: () => <div className="flex justify-center items-center h-32"><p>Loading calculator...</p></div>
});

export default function FractionCalculatorPage() {
  return (
    <div className="container mx-auto flex flex-col items-center">
      <Card className="w-full max-w-xl shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-2 mb-2">
            <DivideSquare className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl">Fraction Calculator</CardTitle>
          </div>
          <CardDescription>
            Perform arithmetic operations (add, subtract, multiply, divide) on fractions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FractionCalculatorComponent />
        </CardContent>
      </Card>
    </div>
  );
}
