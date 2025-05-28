
import { BmrCalculator } from "./components/bmr-calculator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HeartPulse } from "lucide-react";

export default function BmrCalculatorPage() {
  return (
    <div className="container mx-auto flex flex-col items-center">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-2 mb-2">
            <HeartPulse className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl">BMR Calculator</CardTitle>
          </div>
          <CardDescription>
            Estimate your Basal Metabolic Rate (BMR) - the number of calories your body burns at rest.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <BmrCalculator />
            <Card className="mt-6 bg-muted/30">
                <CardHeader className="py-2 px-3">
                    <CardTitle className="text-sm font-medium text-muted-foreground">What is BMR?</CardTitle>
                </CardHeader>
                <CardContent className="text-sm py-2 px-3 text-muted-foreground space-y-1">
                    <p>Your Basal Metabolic Rate (BMR) is the number of calories your body needs to accomplish its most basic (basal) life-sustaining functions, such as breathing, circulation, nutrient processing, and cell production, while at rest.</p>
                    <p className="text-xs">This calculator uses the Mifflin-St Jeor Equation. For a comprehensive health assessment, please consult a healthcare professional.</p>
                </CardContent>
            </Card>
        </CardContent>
      </Card>
    </div>
  );
}
