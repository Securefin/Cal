
import dynamic from 'next/dynamic';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard } from "lucide-react";
import type { Metadata } from 'next';

const CreditCardPaymentCalculator = dynamic(() => import('./components/credit-card-payment-calculator').then(mod => mod.CreditCardPaymentCalculator), {
  ssr: false,
  loading: () => <div className="flex justify-center items-center h-32"><p>Loading calculator...</p></div>
});

export const metadata: Metadata = {
  title: 'Credit Card Payment Calculator - CalcPro',
  description: 'Estimate how long it will take to pay off your credit card balance and the total interest paid based on your monthly payments.',
};

export default function CreditCardPaymentCalculatorPage() {
  return (
    <div className="container mx-auto flex flex-col items-center">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-2 mb-2">
            <CreditCard className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl">Credit Card Payment Calculator</CardTitle>
          </div>
          <CardDescription>
            Estimate how long it will take to pay off your credit card balance and the total interest paid.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CreditCardPaymentCalculator />
        </CardContent>
      </Card>
    </div>
  );
}
