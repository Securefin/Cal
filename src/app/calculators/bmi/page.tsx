
import dynamic from 'next/dynamic';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Scale } from "lucide-react";
import type { Metadata } from 'next';

const BmiCalculator = dynamic(() => import('./components/bmi-calculator').then(mod => mod.BmiCalculator), {
  ssr: false,
  loading: () => <div className="flex justify-center items-center h-32"><p>Loading calculator...</p></div>
});

export const metadata: Metadata = {
  title: 'BMI Calculator (Metric) - CalcPro',
  description: 'Calculate your Body Mass Index (BMI) using your weight in kilograms and height in centimeters. Understand your BMI category.',
};

export default function BmiCalculatorPage() {
  return (
    <div className="container mx-auto flex flex-col items-center">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-2 mb-2">
            <Scale className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl">BMI Calculator</CardTitle>
          </div>
          <CardDescription>
            Calculate your Body Mass Index (BMI) using your weight and height. (Metric units)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <BmiCalculator />
        </CardContent>
      </Card>
    </div>
  );
}
