
"use client";
import dynamic from 'next/dynamic';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Atom } from "lucide-react";

const ScientificCalculatorComponent = dynamic(() => import('./components/scientific-calculator').then(mod => mod.ScientificCalculator), {
  ssr: false,
  loading: () => <div className="flex justify-center items-center h-32"><p>Loading calculator...</p></div>
});

export default function ScientificCalculatorPage() {
  return (
    <div className="container mx-auto flex flex-col items-center py-10 px-4">
      <Card className="w-full max-w-3xl shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-2 mb-2">
            <Atom className="h-8 w-8 text-primary" />
            <CardTitle as="h1" className="text-3xl">Scientific Calculator</CardTitle>
          </div>
          <CardDescription>
            Perform advanced mathematical and scientific calculations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScientificCalculatorComponent />
        </CardContent>
      </Card>
    </div>
  );
}
