"use client";
import dynamic from 'next/dynamic';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Footprints } from "lucide-react";
// Metadata is now in layout.tsx

const StepsToCalorieCalculatorComponent = dynamic(() => import('./components/steps-to-calorie-calculator').then(mod => mod.StepsToCalorieCalculator), {
  ssr: false,
  loading: () => <div className="flex justify-center items-center h-32"><p>Loading calculator...</p></div>
});

export default function StepsToCalorieCalculatorPage() {
  return (
    <div className="container mx-auto flex flex-col items-center">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-2 mb-2">
            <Footprints className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl">Steps to Calories Calculator</CardTitle>
          </div>
          <CardDescription>
            Estimate the number of calories burned based on steps taken and your weight.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <StepsToCalorieCalculatorComponent />
           <Card className="mt-6 bg-muted/30">
            <CardHeader className="py-2 px-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Disclaimer:</CardTitle>
            </CardHeader>
            <CardContent className="text-sm py-2 px-3 text-muted-foreground space-y-1">
                <p>This calculator provides an estimate. Actual calories burned can vary based on walking speed, intensity, terrain, individual metabolism, and other factors. Consult a health professional for personalized advice.</p>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}
