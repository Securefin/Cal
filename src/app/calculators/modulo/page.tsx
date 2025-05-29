"use client";
import dynamic from 'next/dynamic';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Percent } from "lucide-react"; // Using Percent icon as it's the modulo operator symbol
// Metadata is now in layout.tsx

const ModuloCalculatorComponent = dynamic(() => import('./components/modulo-calculator').then(mod => mod.ModuloCalculator), {
  ssr: false,
  loading: () => <div className="flex justify-center items-center h-32"><p>Loading calculator...</p></div>
});

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
          <ModuloCalculatorComponent />
        </CardContent>
      </Card>
    </div>
  );
}
