
"use client";
import dynamic from 'next/dynamic';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Cake } from "lucide-react";

const AgeCalculatorComponent = dynamic(() => import('./components/age-calculator').then(mod => mod.AgeCalculator), {
  ssr: false,
  loading: () => <div className="flex justify-center items-center h-32"><p>Loading calculator...</p></div>
});

export default function AgeCalculatorPage() {
  return (
    <div className="container mx-auto flex flex-col items-center py-10">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-2 mb-2">
            <Cake className="h-8 w-8 text-primary" />
            <CardTitle as="h1" className="text-3xl">Age Calculator</CardTitle>
          </div>
          <CardDescription>
            Calculate your age in years, months, and days based on your date of birth. You can also calculate age as of a specific date.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AgeCalculatorComponent />
        </CardContent>
      </Card>
    </div>
  );
}
