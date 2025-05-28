
import { LoanEmiCalculator } from "./components/loan-emi-calculator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Banknote } from "lucide-react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Loan EMI Calculator - CalcPro',
  description: 'Calculate your Equated Monthly Installment (EMI) for loans. See total interest and total payment for home, car, or personal loans.',
};

export default function LoanEmiCalculatorPage() {
  return (
    <div className="container mx-auto flex flex-col items-center">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-2 mb-2">
            <Banknote className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl">Loan EMI Calculator</CardTitle>
          </div>
          <CardDescription>
            Calculate your Equated Monthly Installment (EMI) for a loan, along with total interest and total payment.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoanEmiCalculator />
        </CardContent>
      </Card>
    </div>
  );
}
