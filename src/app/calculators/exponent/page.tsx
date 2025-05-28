
import dynamic from 'next/dynamic';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Baseline } from "lucide-react";
import type { Metadata } from 'next';

const ExponentCalculator = dynamic(() => import('./components/exponent-calculator').then(mod => mod.ExponentCalculator), {
  ssr: false,
  loading: () => <div className="flex justify-center items-center h-32"><p>Loading calculator...</p></div>
});

export const metadata: Metadata = {
  title: 'Exponent Calculator - CalcPro',
  description: 'Calculate the result of a base number raised to an exponent (power). Handles positive, negative, and decimal values.',
};

export default function ExponentCalculatorPage() {
  return (
    <div className="container mx-auto flex flex-col items-center">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-2 mb-2">
            <Baseline className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl">Exponent Calculator</CardTitle>
          </div>
          <CardDescription>
            Calculate the result of a base raised to an exponent (power).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ExponentCalculator />
        </CardContent>
      </Card>
    </div>
  );
}
