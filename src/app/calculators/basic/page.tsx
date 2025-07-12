
"use client";

import dynamic from 'next/dynamic';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator as CalculatorIcon } from "lucide-react";

const BasicCalculatorComponent = dynamic(
  () => import('./components/basic-calculator').then(mod => mod.BasicCalculator),
  {
    ssr: false,
    loading: () => <div className="flex justify-center items-center h-32"><p>Loading calculator...</p></div>
  }
);

export default function BasicCalculatorPage() {
  return (
    <div className="container mx-auto flex flex-col items-center py-10">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-2 mb-2">
            <CalculatorIcon className="h-8 w-8 text-primary" />
            <CardTitle as="h1" className="text-3xl">Basic Calculator</CardTitle>
          </div>
          <CardDescription>
            Perform simple arithmetic operations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <BasicCalculatorComponent />
        </CardContent>
      </Card>
    </div>
  );
}
