
import dynamic from 'next/dynamic';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import type { Metadata } from 'next';

const SipCalculator = dynamic(() => import('./components/sip-calculator').then(mod => mod.SipCalculator), {
  ssr: false,
  loading: () => <div className="flex justify-center items-center h-32"><p>Loading calculator...</p></div>
});

export const metadata: Metadata = {
  title: 'SIP Calculator - CalcPro',
  description: 'Estimate the future value of your Systematic Investment Plan (SIP) in mutual funds. Calculate total investment, returns, and maturity amount.',
};

export default function SipCalculatorPage() {
  return (
    <div className="container mx-auto flex flex-col items-center">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl">SIP Calculator</CardTitle>
          </div>
          <CardDescription>
            Estimate the future value of your Systematic Investment Plan (SIP) investments.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SipCalculator />
        </CardContent>
      </Card>
    </div>
  );
}
