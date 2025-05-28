
import dynamic from 'next/dynamic';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ReceiptText } from "lucide-react";
import type { Metadata } from 'next';

const GstCalculator = dynamic(() => import('./components/gst-calculator').then(mod => mod.GstCalculator), {
  ssr: false,
  loading: () => <div className="flex justify-center items-center h-32"><p>Loading calculator...</p></div>
});

export const metadata: Metadata = {
  title: 'GST Calculator - CalcPro',
  description: 'Calculate Goods and Services Tax (GST) by either adding GST to a net amount or removing GST from a gross amount for various GST rates.',
};

export default function GstCalculatorPage() {
  return (
    <div className="container mx-auto flex flex-col items-center">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-2 mb-2">
            <ReceiptText className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl">GST Calculator</CardTitle>
          </div>
          <CardDescription>
            Calculate Goods and Services Tax (GST) by adding or removing it from an amount.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <GstCalculator />
        </CardContent>
      </Card>
    </div>
  );
}
