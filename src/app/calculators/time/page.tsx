
import { TimeCalculator } from "./components/time-calculator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";

export default function TimeCalculatorPage() {
  return (
    <div className="container mx-auto flex flex-col items-center">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-2 mb-2">
            <Clock className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl">Time Calculator</CardTitle>
          </div>
          <CardDescription>
            Add or subtract time durations (hours, minutes, seconds).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TimeCalculator />
        </CardContent>
      </Card>
    </div>
  );
}
