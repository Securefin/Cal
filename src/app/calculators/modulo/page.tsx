
import { ModuloCalculator } from "./components/modulo-calculator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Percent } from "lucide-react"; // Using Percent icon as it's the modulo operator symbol
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Modulo Calculator - CalcPro',
  description: 'Find the remainder of a division operation (dividend % divisor) with our simple modulo calculator.',
};

export default function ModuloCalculatorPage() {
  return (
    <div className="container mx-auto flex flex-col items-center">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-2 mb-2">
            <Percent className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl">Modulo Calculator</CardTitle>
          </div>
          <CardDescription>
            Calculate the remainder of a division operation (dividend % divisor).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ModuloCalculator />
        </CardContent>
      </Card>
    </div>
  );
}
