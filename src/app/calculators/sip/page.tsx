"use client";
import dynamic from 'next/dynamic';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
// Metadata is now in layout.tsx

const SipCalculatorComponent = dynamic(() => import('./components/sip-calculator').then(mod => mod.SipCalculator), {
  ssr: false,
  loading: () => <div className="flex justify-center items-center h-32"><p>Loading calculator...</p></div>
});

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
          <SipCalculatorComponent />
        </CardContent>
      </Card>
    </div>
  );
}
