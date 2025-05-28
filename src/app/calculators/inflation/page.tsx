
import { InflationCalculator } from "./components/inflation-calculator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowBigUpDash } from "lucide-react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Inflation Calculator - CalcPro',
  description: 'Estimate the future value of money and the impact of inflation over time. Enter initial amount, years, and inflation rate.',
};

export default function InflationCalculatorPage() {
  return (
    <div className="container mx-auto flex flex-col items-center">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-2 mb-2">
            <ArrowBigUpDash className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl">Inflation Calculator</CardTitle>
          </div>
          <CardDescription>
            Estimate the future value of an amount based on average annual inflation.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <InflationCalculator />
        </CardContent>
      </Card>
    </div>
  );
}
