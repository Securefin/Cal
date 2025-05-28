
import { FractionCalculator } from "./components/fraction-calculator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DivideSquare } from "lucide-react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fraction Calculator - CalcPro',
  description: 'Perform arithmetic operations (add, subtract, multiply, divide) on fractions. Get results in simplified, mixed, and decimal forms.',
};

export default function FractionCalculatorPage() {
  return (
    <div className="container mx-auto flex flex-col items-center">
      <Card className="w-full max-w-xl shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-2 mb-2">
            <DivideSquare className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl">Fraction Calculator</CardTitle>
          </div>
          <CardDescription>
            Perform arithmetic operations (add, subtract, multiply, divide) on fractions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FractionCalculator />
        </CardContent>
      </Card>
    </div>
  );
}
