"use client";
import dynamic from 'next/dynamic';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarClock } from "lucide-react";
// Metadata is now in layout.tsx

const DateDifferenceCalculatorComponent = dynamic(() => import('./components/date-difference-calculator').then(mod => mod.DateDifferenceCalculator), {
  ssr: false,
  loading: () => <div className="flex justify-center items-center h-32"><p>Loading calculator...</p></div>
});

export default function DateDifferenceCalculatorPage() {
  return (
    <div className="container mx-auto flex flex-col items-center">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-2 mb-2">
            <CalendarClock className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl">Date Difference Calculator</CardTitle>
          </div>
          <CardDescription>
            Calculate the duration between two dates in years, months, days, and total days.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DateDifferenceCalculatorComponent />
        </CardContent>
      </Card>
    </div>
  );
}
