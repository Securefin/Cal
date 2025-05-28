
import dynamic from 'next/dynamic';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator } from "lucide-react";
import type { Metadata } from 'next';

const BasicCalculator = dynamic(() => import('./components/basic-calculator').then(mod => mod.BasicCalculator), {
  ssr: false,
  loading: () => <div className="flex justify-center items-center h-32"><p>Loading calculator...</p></div>
});

export const metadata: Metadata = {
  title: 'Basic Calculator - CalcPro',
  description: 'Perform simple arithmetic operations like addition, subtraction, multiplication, and division with our easy-to-use Basic Calculator.',
};

export default function BasicCalculatorPage() {
  return (
    <div className="container mx-auto flex flex-col items-center">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-2 mb-2">
            <Calculator className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl">Basic Calculator</CardTitle>
          </div>
          <CardDescription>
            Perform simple arithmetic operations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <BasicCalculator />
        </CardContent>
      </Card>
    </div>
  );
}
