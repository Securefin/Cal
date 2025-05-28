
import dynamic from 'next/dynamic';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PiggyBank } from "lucide-react";
import type { Metadata } from 'next';

const PpfCalculator = dynamic(() => import('./components/ppf-calculator').then(mod => mod.PpfCalculator), {
  ssr: false,
  loading: () => <div className="flex justify-center items-center h-32"><p>Loading calculator...</p></div>
});

export const metadata: Metadata = {
  title: 'PPF Calculator - CalcPro',
  description: 'Estimate the maturity value and interest earned on your Public Provident Fund (PPF) investments with our PPF calculator.',
};

export default function PpfCalculatorPage() {
  return (
    <div className="container mx-auto flex flex-col items-center">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-2 mb-2">
            <PiggyBank className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl">PPF Calculator</CardTitle>
          </div>
          <CardDescription>
            Estimate the maturity value and interest earned on your Public Provident Fund (PPF) investments.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PpfCalculator />
        </CardContent>
      </Card>
    </div>
  );
}
