"use client";
import dynamic from 'next/dynamic';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dumbbell } from "lucide-react";
// Metadata is now in layout.tsx

const MuscleMassCalculatorComponent = dynamic(() => import('./components/muscle-mass-calculator').then(mod => mod.MuscleMassCalculator), {
  ssr: false,
  loading: () => <div className="flex justify-center items-center h-32"><p>Loading calculator...</p></div>
});

export default function MuscleMassCalculatorPage() {
  return (
    <div className="container mx-auto flex flex-col items-center">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-2 mb-2">
            <Dumbbell className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl">Muscle Mass Calculator</CardTitle>
          </div>
          <CardDescription>
            Estimate your Body Fat Percentage and Lean Body Mass using circumference measurements (Hodgdon and Beckett formula).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <MuscleMassCalculatorComponent />
          <Card className="mt-6 bg-muted/30">
            <CardHeader className="py-2 px-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Important Note & Disclaimer:</CardTitle>
            </CardHeader>
            <CardContent className="text-sm py-2 px-3 text-muted-foreground space-y-1">
                <p>This calculator provides an estimation of body composition. Lean Body Mass (LBM) includes muscle, bones, organs, and water. It is often used as an indicator related to muscle mass.</p>
                <p>The formulas used (Hodgdon and Beckett, commonly known as the U.S. Navy method) are based on statistical averages and may not be perfectly accurate for all individuals. Factors like body type, hydration levels, and specific muscle development can influence results.</p>
                <p>For precise body composition analysis, consult with a healthcare or fitness professional who can use clinical methods like DEXA scans or hydrostatic weighing.</p>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}
