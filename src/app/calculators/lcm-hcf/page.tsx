
import { LcmHcfCalculator } from "./components/lcm-hcf-calculator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Layers } from "lucide-react";

export default function LcmHcfCalculatorPage() {
  return (
    <div className="container mx-auto flex flex-col items-center">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-2 mb-2">
            <Layers className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl">LCM & HCF Calculator</CardTitle>
          </div>
          <CardDescription>
            Calculate the Least Common Multiple (LCM) and Highest Common Factor (HCF/GCD) of two numbers.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LcmHcfCalculator />
        </CardContent>
      </Card>
    </div>
  );
}
