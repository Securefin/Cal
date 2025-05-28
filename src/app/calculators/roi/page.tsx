
import { RoiCalculator } from "./components/roi-calculator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity } from "lucide-react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ROI Calculator - CalcPro',
  description: 'Calculate your Return on Investment (ROI) to evaluate the profitability and efficiency of an investment. See net profit and ROI percentage.',
};

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
          <RoiCalculator />
        </CardContent>
      </Card>
    </div>
  );
}
