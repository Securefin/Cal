
import { PercentageCalculator } from "./components/percentage-calculator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Percent } from "lucide-react";

export default function PercentageCalculatorPage() {
  return (
    <div className="container mx-auto flex flex-col items-center">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-2 mb-2">
            <Percent className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl">Percentage Calculator</CardTitle>
          </div>
          <CardDescription>
            Calculate various percentage-based problems.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PercentageCalculator />
        </CardContent>
      </Card>
    </div>
  );
}
