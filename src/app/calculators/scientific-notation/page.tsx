"use client";
import dynamic from 'next/dynamic';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Atom } from "lucide-react";
// Metadata is now in layout.tsx

const ScientificNotationCalculatorComponent = dynamic(() => import('./components/scientific-notation-calculator').then(mod => mod.ScientificNotationCalculator), {
  ssr: false,
  loading: () => <div className="flex justify-center items-center h-32"><p>Loading calculator...</p></div>
});

export default function ScientificNotationCalculatorPage() {
  return (
    <div className="container mx-auto flex flex-col items-center">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-2 mb-2">
            <Atom className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl">Scientific Notation Calculator</CardTitle>
          </div>
          <CardDescription>
            Convert numbers to and from scientific notation (e.g., 1.23e+4).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScientificNotationCalculatorComponent />
        </CardContent>
      </Card>
    </div>
  );
}
