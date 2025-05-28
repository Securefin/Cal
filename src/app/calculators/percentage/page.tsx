
import dynamic from 'next/dynamic';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Percent } from "lucide-react";
import type { Metadata } from 'next';

const PercentageCalculator = dynamic(() => import('./components/percentage-calculator').then(mod => mod.PercentageCalculator), {
  ssr: false,
  loading: () => <div className="flex justify-center items-center h-32"><p>Loading calculator...</p></div>
});

export const metadata: Metadata = {
  title: 'Percentage Calculator - CalcPro',
  description: 'Easily calculate percentages: find X% of Y, determine what percentage X is of Y, or calculate percentage increase/decrease.',
};

export default function PercentageCalculatorPage() {
  return (
    <div className="container mx-auto flex flex-col items-center">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-2 mb-2">
            <Percent className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl">Percentage Calculator</CardTitle>
          </div>
          <CardDescription>
            Calculate various percentage-based problems.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PercentageCalculator />
        </CardContent>
      </Card>
    </div>
  );
}
