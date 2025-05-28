
import { RatioCalculator } from "./components/ratio-calculator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Ratio } from "lucide-react";

export default function RatioCalculatorPage() {
  return (
    <div className="container mx-auto flex flex-col items-center">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-2 mb-2">
            <Ratio className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl">Ratio Calculator</CardTitle>
          </div>
          <CardDescription>
            Solve for an unknown value in a proportion (A : B = C : D). Enter any three values to calculate the fourth.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RatioCalculator />
        </CardContent>
      </Card>
    </div>
  );
}
