"use client";
import dynamic from 'next/dynamic';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Signal } from "lucide-react";
// Metadata is now in layout.tsx

const WavelengthCalculatorComponent = dynamic(() => import('./components/wavelength-calculator').then(mod => mod.WavelengthCalculator), {
  ssr: false,
  loading: () => <div className="flex justify-center items-center h-32"><p>Loading calculator...</p></div>
});

export default function WavelengthCalculatorPage() {
  return (
    <div className="container mx-auto flex flex-col items-center">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-2 mb-2">
            <Signal className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl">Wavelength & Frequency Calculator (Light)</CardTitle>
          </div>
          <CardDescription>
            Calculate the wavelength or frequency of electromagnetic waves using the speed of light (c = λf).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <WavelengthCalculatorComponent />
        </CardContent>
      </Card>
      <Card className="w-full max-w-lg shadow-lg mt-6 bg-muted/30">
        <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">About this Calculator:</CardTitle>
        </CardHeader>
        <CardContent className="text-sm py-2 px-3 text-muted-foreground space-y-1">
            <p>This calculator uses the constant speed of light in a vacuum (c ≈ 299,792,458 m/s).</p>
            <p>Enter either the frequency in Hertz (Hz) or the wavelength in meters (m), and the other value will be calculated automatically.</p>
        </CardContent>
      </Card>
    </div>
  );
}
