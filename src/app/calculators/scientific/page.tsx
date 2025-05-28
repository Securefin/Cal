
import { ScientificCalculator } from "./components/scientific-calculator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Atom } from "lucide-react"; // Using Atom icon for Scientific Calculator

export default function ScientificCalculatorPage() {
  return (
    <div className="container mx-auto flex flex-col items-center">
      <Card className="w-full max-w-xl shadow-lg"> {/* Increased max-width for more buttons */}
        <CardHeader>
          <div className="flex items-center space-x-2 mb-2">
            <Atom className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl">Scientific Calculator</CardTitle>
          </div>
          <CardDescription>
            Perform advanced mathematical and scientific calculations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScientificCalculator />
        </CardContent>
      </Card>
    </div>
  );
}
