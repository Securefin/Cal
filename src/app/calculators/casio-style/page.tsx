
import { ScientificCalculator } from "@/app/calculators/scientific/components/scientific-calculator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator as CalculatorIcon } from "lucide-react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Casio-style Scientific Calculator - CalcPro',
  description: 'A comprehensive scientific calculator featuring functions commonly found on Casio models, including trig, logs, powers, and more.',
};

export default function CasioStyleCalculatorPage() {
  return (
    <div className="container mx-auto flex flex-col items-center">
      <Card className="w-full max-w-xl shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-2 mb-2">
            <CalculatorIcon className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl">Casio-style Scientific Calculator</CardTitle>
          </div>
          <CardDescription>
            A comprehensive scientific calculator with features commonly found on Casio models.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScientificCalculator />
        </CardContent>
      </Card>
       <Card className="mt-6 bg-muted/30 w-full max-w-xl shadow-lg">
        <CardHeader className="py-2 px-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Note:</CardTitle>
        </CardHeader>
        <CardContent className="text-sm py-2 px-3 text-muted-foreground space-y-1">
            <p>This calculator provides a range of scientific functions. The "Casio-style" label refers to the common set of functionalities often available on such calculators rather than a specific visual interface of a Casio model.</p>
        </CardContent>
      </Card>
    </div>
  );
}
