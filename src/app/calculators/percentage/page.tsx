"use client";
import dynamic from 'next/dynamic';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Percent } from "lucide-react";
// Metadata is now in layout.tsx

const PercentageCalculatorComponent = dynamic(() => import('./components/percentage-calculator').then(mod => mod.PercentageCalculator), {
  ssr: false,
  loading: () => <div className="flex justify-center items-center h-32"><p>Loading calculator...</p></div>
});

export default function PercentageCalculatorPage() {
  return (
    <div className="container mx-auto flex flex-col items-center">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-2 mb-2">
            <Percent className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl">Percentage Calculator</CardTitle>
          </div>
          <CardDescription>
            Calculate various percentage-based problems.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PercentageCalculatorComponent />
        </CardContent>
      </Card>
    </div>
  );
}
