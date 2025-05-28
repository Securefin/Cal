
import dynamic from 'next/dynamic';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dice5 } from "lucide-react";
import type { Metadata } from 'next';

const RandomNumberGenerator = dynamic(() => import('./components/random-number-generator').then(mod => mod.RandomNumberGenerator), {
  ssr: false,
  loading: () => <div className="flex justify-center items-center h-32"><p>Loading calculator...</p></div>
});

export const metadata: Metadata = {
  title: 'Random Number Generator - CalcPro',
  description: 'Generate random integers within a specified range (min/max). Choose how many random numbers you need.',
};

export default function RandomNumberGeneratorPage() {
  return (
    <div className="container mx-auto flex flex-col items-center">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-2 mb-2">
            <Dice5 className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl">Random Number Generator</CardTitle>
          </div>
          <CardDescription>
            Generate random integers within a specified range.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RandomNumberGenerator />
        </CardContent>
      </Card>
       <Card className="w-full max-w-lg shadow-lg mt-6 bg-muted/30">
        <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">How to use:</CardTitle>
        </CardHeader>
        <CardContent className="text-sm py-2 px-3 text-muted-foreground space-y-1">
            <p>1. Enter the minimum and maximum values for the range.</p>
            <p>2. Specify how many random numbers you want to generate.</p>
            <p>3. Click "Generate" to see the random number(s).</p>
            <p>The numbers generated are integers and inclusive of the min/max values.</p>
        </CardContent>
      </Card>
    </div>
  );
}
