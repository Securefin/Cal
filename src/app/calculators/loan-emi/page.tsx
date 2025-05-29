"use client";
import dynamic from 'next/dynamic';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Banknote } from "lucide-react";
// Metadata is now in layout.tsx

const LoanEmiCalculatorComponent = dynamic(() => import('./components/loan-emi-calculator').then(mod => mod.LoanEmiCalculator), {
  ssr: false,
  loading: () => <div className="flex justify-center items-center h-32"><p>Loading calculator...</p></div>
});

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
          <LoanEmiCalculatorComponent />
        </CardContent>
      </Card>
    </div>
  );
}
