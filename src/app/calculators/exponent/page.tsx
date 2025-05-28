
import { ExponentCalculator } from "./components/exponent-calculator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Baseline } from "lucide-react";

export default function ExponentCalculatorPage() {
  return (
    <div className="container mx-auto flex flex-col items-center">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-2 mb-2">
            <Baseline className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl">Exponent Calculator</CardTitle>
          </div>
          <CardDescription>
            Calculate the result of a base raised to an exponent (power).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ExponentCalculator />
        </CardContent>
      </Card>
    </div>
  );
}
