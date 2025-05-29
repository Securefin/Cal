"use client";
import dynamic from 'next/dynamic';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Ratio } from "lucide-react";
// Metadata is now in layout.tsx

const RatioCalculatorComponent = dynamic(() => import('./components/ratio-calculator').then(mod => mod.RatioCalculator), {
  ssr: false,
  loading: () => <div className="flex justify-center items-center h-32"><p>Loading calculator...</p></div>
});

export default function RatioCalculatorPage() {
  return (
    <div className="container mx-auto flex flex-col items-center">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-2 mb-2">
            <Ratio className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl">Ratio Calculator</CardTitle>
          </div>
          <CardDescription>
            Solve for an unknown value in a proportion (A : B = C : D). Enter any three values to calculate the fourth.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RatioCalculatorComponent />
        </CardContent>
      </Card>
    </div>
  );
}
