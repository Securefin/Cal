
import { FdCalculator } from "./components/fd-calculator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fixed Deposit (FD) Calculator - CalcPro',
  description: 'Calculate the maturity value and total interest earned on your Fixed Deposit (FD) based on principal, rate, tenure, and compounding frequency.',
};

export default function FdCalculatorPage() {
  return (
    <div className="container mx-auto flex flex-col items-center">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-2 mb-2">
            <ShieldCheck className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl">Fixed Deposit (FD) Calculator</CardTitle>
          </div>
          <CardDescription>
            Calculate the maturity value and interest earned on your Fixed Deposit.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FdCalculator />
        </CardContent>
      </Card>
    </div>
  );
}
