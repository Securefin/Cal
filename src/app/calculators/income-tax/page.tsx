"use client";
import dynamic from 'next/dynamic';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";
// Metadata is now in layout.tsx

const IncomeTaxCalculatorIndiaComponent = dynamic(() => import('./components/income-tax-calculator-india').then(mod => mod.IncomeTaxCalculatorIndia), {
  ssr: false,
  loading: () => <div className="flex justify-center items-center h-32"><p>Loading calculator...</p></div>
});

export default function IncomeTaxCalculatorPage() {
  return (
    <div className="container mx-auto flex flex-col items-center">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-2 mb-2">
            <FileText className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl">Income Tax Calculator (India)</CardTitle>
          </div>
          <CardDescription>
            Estimate your income tax for Assessment Year 2025-26 (Financial Year 2024-25) under the <strong>New Tax Regime</strong>.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <IncomeTaxCalculatorIndiaComponent />
          <Card className="mt-6 bg-muted/30">
            <CardHeader className="py-2 px-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Important Notes:</CardTitle>
            </CardHeader>
            <CardContent className="text-sm py-2 px-3 text-muted-foreground space-y-1">
              <p>
                This calculator provides an estimate based on the basic slabs of the New Tax Regime for AY 2025-26.
              </p>
              <p>
                <strong>Standard Deduction:</strong> For salaried individuals and pensioners, a standard deduction of ₹50,000 is available under the new regime. Please reduce this from your gross salary to arrive at your "Total Taxable Income" before using this calculator.
              </p>
              <p>
                This version does not include calculations for surcharge on high income, other specific deductions (like HRA, Chapter VI-A deductions beyond standard deduction if any permissible under new regime), or capital gains.
              </p>
              <p>
                Tax laws are subject to change. Always consult with a qualified tax professional for accurate advice.
              </p>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}
