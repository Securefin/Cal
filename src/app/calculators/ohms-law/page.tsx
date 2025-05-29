"use client";
import dynamic from 'next/dynamic';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap } from "lucide-react";
// Metadata is now in layout.tsx

const OhmsLawCalculatorComponent = dynamic(() => import('./components/ohms-law-calculator').then(mod => mod.OhmsLawCalculator), {
  ssr: false,
  loading: () => <div className="flex justify-center items-center h-32"><p>Loading calculator...</p></div>
});

export default function OhmsLawCalculatorPage() {
  return (
    <div className="container mx-auto flex flex-col items-center">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-2 mb-2">
            <Zap className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl">Ohm's Law Calculator (V=IR)</CardTitle>
          </div>
          <CardDescription>
            Calculate Voltage (V), Current (I), or Resistance (R) using Ohm's Law. Enter any two values to find the third.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <OhmsLawCalculatorComponent />
        </CardContent>
      </Card>
      <Card className="w-full max-w-lg shadow-lg mt-6 bg-muted/30">
        <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">About Ohm's Law:</CardTitle>
        </CardHeader>
        <CardContent className="text-sm py-2 px-3 text-muted-foreground space-y-1">
            <p>Ohm's Law states that the current through a conductor between two points is directly proportional to the voltage across the two points, and inversely proportional to the resistance between them.</p>
            <p className="font-semibold">Formulas:</p>
            <ul className="list-disc pl-5">
                <li>Voltage (V) = Current (I) × Resistance (R)</li>
                <li>Current (I) = Voltage (V) / Resistance (R)</li>
                <li>Resistance (R) = Voltage (V) / Current (I)</li>
            </ul>
        </CardContent>
      </Card>
    </div>
  );
}
