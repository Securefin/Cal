
import { ElectricityCostCalculator } from "./components/electricity-cost-calculator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap } from "lucide-react";

export default function ElectricityCalculatorPage() {
  return (
    <div className="container mx-auto flex flex-col items-center">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-2 mb-2">
            <Zap className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl">Appliance Electricity Cost Calculator</CardTitle>
          </div>
          <CardDescription>
            Estimate the monthly cost of running an electrical appliance.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ElectricityCostCalculator />
        </CardContent>
      </Card>
    </div>
  );
}
