import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator } from "lucide-react";

export default function CalculatorsPage() {
  return (
    <div className="container mx-auto">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-2 mb-2">
            <Calculator className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl">Calculators</CardTitle>
          </div>
          <CardDescription>
            Explore our collection of specialized calculators.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>More calculators coming soon!</p>
          {/* TODO: Add links or components for individual calculators here */}
        </CardContent>
      </Card>
    </div>
  );
}
