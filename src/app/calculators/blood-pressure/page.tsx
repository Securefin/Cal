
import dynamic from 'next/dynamic';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity } from "lucide-react";
import type { Metadata } from 'next';

const BloodPressureCalculator = dynamic(() => import('./components/blood-pressure-calculator').then(mod => mod.BloodPressureCalculator), {
  ssr: false,
  loading: () => <div className="flex justify-center items-center h-32"><p>Loading calculator...</p></div>
});

export const metadata: Metadata = {
  title: 'Blood Pressure Calculator - CalcPro',
  description: 'Enter your systolic and diastolic blood pressure readings to understand your category based on general guidelines. Informational purposes only.',
};

export default function BloodPressureCalculatorPage() {
  return (
    <div className="container mx-auto flex flex-col items-center">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-2 mb-2">
            <Activity className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl">Blood Pressure Calculator</CardTitle>
          </div>
          <CardDescription>
            Enter your systolic and diastolic blood pressure readings to understand your category based on general guidelines. This tool is for informational purposes only.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <BloodPressureCalculator />
        </CardContent>
      </Card>
    </div>
  );
}
