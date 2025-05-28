
import { BasicCalculator } from "./components/basic-calculator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator } from "lucide-react";

export default function BasicCalculatorPage() {
  return (
    <div className="container mx-auto flex flex-col items-center">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-2 mb-2">
            <Calculator className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl">Basic Calculator</CardTitle>
          </div>
          <CardDescription>
            Perform simple arithmetic operations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <BasicCalculator />
        </CardContent>
      </Card>
    </div>
  );
}
