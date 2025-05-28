
import dynamic from 'next/dynamic';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tag } from "lucide-react";
import type { Metadata } from 'next';

const DiscountCalculator = dynamic(() => import('./components/discount-calculator').then(mod => mod.DiscountCalculator), {
  ssr: false,
  loading: () => <div className="flex justify-center items-center h-32"><p>Loading calculator...</p></div>
});

export const metadata: Metadata = {
  title: 'Discount Calculator - CalcPro',
  description: 'Calculate the final price after a discount and see how much you save. Enter original price and discount percentage.',
};

export default function DiscountCalculatorPage() {
  return (
    <div className="container mx-auto flex flex-col items-center">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-2 mb-2">
            <Tag className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl">Discount Calculator</CardTitle>
          </div>
          <CardDescription>
            Calculate the final price after a discount and see how much you save.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DiscountCalculator />
        </CardContent>
      </Card>
    </div>
  );
}
