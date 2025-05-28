
import { NpvCalculator } from "./components/npv-calculator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart } from "lucide-react";

export default function NpvCalculatorPage() {
  return (
    <div className="container mx-auto flex flex-col items-center">
      <Card className="w-full max-w-2xl shadow-lg"> {/* Increased width for NPV */}
        <CardHeader>
          <div className="flex items-center space-x-2 mb-2">
            <LineChart className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl">NPV (Net Present Value) Calculator</CardTitle>
          </div>
          <CardDescription>
            Calculate the Net Present Value of an investment by providing the discount rate, initial investment, and future cash flows.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <NpvCalculator />
        </CardContent>
      </Card>
    </div>
  );
}
