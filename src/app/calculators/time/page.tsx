
import dynamic from 'next/dynamic';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";
import type { Metadata } from 'next';

const TimeCalculator = dynamic(() => import('./components/time-calculator').then(mod => mod.TimeCalculator), {
  ssr: false,
  loading: () => <div className="flex justify-center items-center h-32"><p>Loading calculator...</p></div>
});

export const metadata: Metadata = {
  title: 'Time Calculator - CalcPro',
  description: 'Add or subtract time durations (hours, minutes, seconds). Easily calculate resulting time for various operations.',
};

export default function TimeCalculatorPage() {
  return (
    <div className="container mx-auto flex flex-col items-center">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-2 mb-2">
            <Clock className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl">Time Calculator</CardTitle>
          </div>
          <CardDescription>
            Add or subtract time durations (hours, minutes, seconds).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TimeCalculator />
        </CardContent>
      </Card>
    </div>
  );
}
