
import { StepsToCalorieCalculator } from "./components/steps-to-calorie-calculator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Footprints } from "lucide-react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Steps to Calories Calculator - CalcPro',
  description: 'Estimate the number of calories burned from walking based on the number of steps taken and your weight.',
};

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
          <StepsToCalorieCalculator />
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
