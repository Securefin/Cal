
import { UnitConverter } from "./components/unit-converter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Replace } from "lucide-react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Unit Converter (Length) - CalcPro',
  description: 'Convert between various length units: meters, kilometers, miles, feet, inches, centimeters, millimeters, and yards. More units coming soon.',
};

export default function UnitConverterPage() {
  return (
    <div className="container mx-auto flex flex-col items-center">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-2 mb-2">
            <Replace className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl">Unit Converter</CardTitle>
          </div>
          <CardDescription>
            Convert measurements. This initial version focuses on Length conversions. More categories coming soon!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UnitConverter />
        </CardContent>
      </Card>
       <Card className="w-full max-w-lg shadow-lg mt-6 bg-muted/30">
        <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">How to use:</CardTitle>
        </CardHeader>
        <CardContent className="text-sm py-2 px-3 text-muted-foreground space-y-1">
            <p>1. Enter the value you want to convert in the "Value" field.</p>
            <p>2. Select the unit you are converting from in the "From Unit" dropdown.</p>
            <p>3. Select the unit you want to convert to in the "To Unit" dropdown.</p>
            <p>4. The converted value will be displayed automatically in the "Result" field.</p>
            <p>Currently supported length units: Meter, Kilometer, Centimeter, Millimeter, Mile, Yard, Foot, Inch.</p>
        </CardContent>
      </Card>
    </div>
  );
}
