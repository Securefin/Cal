"use client";
import dynamic from 'next/dynamic';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HandCoins } from "lucide-react";
// Metadata is now in layout.tsx

const TipCalculatorComponent = dynamic(() => import('./components/tip-calculator').then(mod => mod.TipCalculator), {
  ssr: false,
  loading: () => <div className="flex justify-center items-center h-32"><p>Loading calculator...</p></div>
});

export default function TipCalculatorPage() {
  return (
    <div className="container mx-auto flex flex-col items-center">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-2 mb-2">
            <HandCoins className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl">Tip Calculator</CardTitle>
          </div>
          <CardDescription>
            Calculate the tip, total bill, and amount per person.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TipCalculatorComponent />
        </CardContent>
      </Card>
    </div>
  );
}
