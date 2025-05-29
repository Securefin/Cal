"use client";
import dynamic from 'next/dynamic';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap } from "lucide-react";
// Metadata is now in layout.tsx

const ElectricityCostCalculatorComponent = dynamic(() => import('./components/electricity-cost-calculator').then(mod => mod.ElectricityCostCalculator), {
  ssr: false,
  loading: () => <div className="flex justify-center items-center h-32"><p>Loading calculator...</p></div>
});

export default function ElectricityCalculatorPage() {
  return (
    <div className="container mx-auto flex flex-col items-center">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-2 mb-2">
            <Zap className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl">Appliance Electricity Cost Calculator</CardTitle>
          </div>
          <CardDescription>
            Estimate the monthly cost of running an electrical appliance.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ElectricityCostCalculatorComponent />
        </CardContent>
      </Card>
    </div>
  );
}
