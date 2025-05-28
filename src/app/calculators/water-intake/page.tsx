
import dynamic from 'next/dynamic';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Droplet } from "lucide-react";
import type { Metadata } from 'next';

const WaterIntakeCalculator = dynamic(() => import('./components/water-intake-calculator').then(mod => mod.WaterIntakeCalculator), {
  ssr: false,
  loading: () => <div className="flex justify-center items-center h-32"><p>Loading calculator...</p></div>
});

export const metadata: Metadata = {
  title: 'Water Intake Calculator - CalcPro',
  description: 'Estimate your daily water intake needs in liters based on your weight and activity level. Stay hydrated!',
};

export default function WaterIntakeCalculatorPage() {
  return (
    <div className="container mx-auto flex flex-col items-center">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-2 mb-2">
            <Droplet className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl">Water Intake Calculator</CardTitle>
          </div>
          <CardDescription>
            Estimate your daily water intake needs based on your weight and activity level.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <WaterIntakeCalculator />
          <Card className="mt-6 bg-muted/30">
            <CardHeader className="py-2 px-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Disclaimer:</CardTitle>
            </CardHeader>
            <CardContent className="text-sm py-2 px-3 text-muted-foreground space-y-1">
                <p>This calculator provides an estimate and is for informational purposes only. Individual water needs can vary based on health, climate, and other factors. Consult a healthcare professional for personalized advice.</p>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}
