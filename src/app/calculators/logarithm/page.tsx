
import { LogarithmCalculator } from "./components/logarithm-calculator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Target } from "lucide-react"; // Using Target icon

export default function LogarithmCalculatorPage() {
  return (
    <div className="container mx-auto flex flex-col items-center">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-2 mb-2">
            <Target className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl">Logarithm Calculator</CardTitle>
          </div>
          <CardDescription>
            Calculate natural log (ln), common log (log₁₀), or log to a custom base.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LogarithmCalculator />
        </CardContent>
      </Card>
    </div>
  );
}
