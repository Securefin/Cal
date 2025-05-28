
import { BmiCalculator } from "./components/bmi-calculator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Scale } from "lucide-react";

export default function BmiCalculatorPage() {
  return (
    <div className="container mx-auto flex flex-col items-center">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-2 mb-2">
            <Scale className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl">BMI Calculator</CardTitle>
          </div>
          <CardDescription>
            Calculate your Body Mass Index (BMI) using your weight and height. (Metric units)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <BmiCalculator />
        </CardContent>
      </Card>
    </div>
  );
}
