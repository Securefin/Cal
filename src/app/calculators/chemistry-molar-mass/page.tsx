"use client";
import dynamic from 'next/dynamic';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FlaskConical } from "lucide-react";
// Metadata is now in layout.tsx

const ChemistryMolarMassCalculatorComponent = dynamic(() => import('./components/chemistry-molar-mass-calculator').then(mod => mod.ChemistryMolarMassCalculator), {
  ssr: false,
  loading: () => <div className="flex justify-center items-center h-32"><p>Loading calculator...</p></div>
});

export default function ChemistryMolarMassCalculatorPage() {
  return (
    <div className="container mx-auto flex flex-col items-center">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-2 mb-2">
            <FlaskConical className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl">Chemistry Molar Mass Calculator</CardTitle>
          </div>
          <CardDescription>
            Calculate the molar mass of a chemical compound by entering its formula (e.g., H2O, NaCl, C6H12O6).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChemistryMolarMassCalculatorComponent />
          <Card className="mt-6 bg-muted/30">
            <CardHeader className="py-2 px-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Important Notes:</CardTitle>
            </CardHeader>
            <CardContent className="text-sm py-2 px-3 text-muted-foreground space-y-1">
                <p>Enter chemical formulas using standard element symbols (e.g., H, O, Na, Cl).</p>
                <p>Counts for elements should follow the symbol (e.g., H2 for two hydrogens, O for one oxygen).</p>
                <p className="font-semibold text-destructive/80">Limitation: This version does not support parentheses in formulas (e.g., Ca(OH)2). Support for complex formulas may be added in the future.</p>
                <p>Ensure element symbols are correctly cased (e.g., 'Co' for Cobalt, not 'co').</p>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}
