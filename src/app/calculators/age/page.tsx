
import { AgeCalculator } from "./components/age-calculator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Cake } from "lucide-react";

export default function AgeCalculatorPage() {
  return (
    <div className="container mx-auto flex flex-col items-center">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-2 mb-2">
            <Cake className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl">Age Calculator</CardTitle>
          </div>
          <CardDescription>
            Calculate your age in years, months, and days based on your date of birth. You can also calculate age as of a specific date.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AgeCalculator />
        </CardContent>
      </Card>
    </div>
  );
}
