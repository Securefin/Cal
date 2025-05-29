"use client";
import dynamic from 'next/dynamic';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Hash } from "lucide-react"; // Using Hash as a generic math icon
// Metadata is now in layout.tsx

const AverageCalculatorComponent = dynamic(() => import('./components/average-calculator').then(mod => mod.AverageCalculator), {
  ssr: false,
  loading: () => <div className="flex justify-center items-center h-32"><p>Loading calculator...</p></div>
});

export default function AverageCalculatorPage() {
  return (
    <div className="container mx-auto flex flex-col items-center">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-2 mb-2">
            <Hash className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl">Average Calculator</CardTitle>
          </div>
          <CardDescription>
            Calculate the average of a list of numbers.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AverageCalculatorComponent />
        </CardContent>
      </Card>
    </div>
  );
}
