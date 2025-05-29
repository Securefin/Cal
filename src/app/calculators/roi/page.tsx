"use client";
import dynamic from 'next/dynamic';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity } from "lucide-react";
// Metadata is now in layout.tsx

const RoiCalculatorComponent = dynamic(() => import('./components/roi-calculator').then(mod => mod.RoiCalculator), {
  ssr: false,
  loading: () => <div className="flex justify-center items-center h-32"><p>Loading calculator...</p></div>
});

export default function RoiCalculatorPage() {
  return (
    <div className="container mx-auto flex flex-col items-center">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-2 mb-2">
            <Activity className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl">ROI Calculator</CardTitle>
          </div>
          <CardDescription>
            Calculate your Return on Investment (ROI) to evaluate the profitability of an investment.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RoiCalculatorComponent />
        </CardContent>
      </Card>
    </div>
  );
}
