
import { PregnancyDueDateCalculator } from "./components/pregnancy-due-date-calculator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays } from "lucide-react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pregnancy Due Date Calculator - CalcPro',
  description: "Estimate your baby's due date based on the first day of your last menstrual period (LMP) using Naegele's rule.",
};

export default function PregnancyDueDateCalculatorPage() {
  return (
    <div className="container mx-auto flex flex-col items-center">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-2 mb-2">
            <CalendarDays className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl">Pregnancy Due Date Calculator</CardTitle>
          </div>
          <CardDescription>
            Estimate your baby's due date based on the first day of your last menstrual period (LMP).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PregnancyDueDateCalculator />
        </CardContent>
      </Card>
    </div>
  );
}
