
"use client";

import { useState, type ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Calculator, Eraser, FlaskConical } from "lucide-react";

const atomicMasses: Record<string, number> = {
  H: 1.008, C: 12.011, N: 14.007, O: 15.999, F: 18.998,
  Na: 22.990, Mg: 24.305, Al: 26.982, Si: 28.085, P: 30.974,
  S: 32.06, Cl: 35.45, K: 39.098, Ca: 40.078, Sc: 44.956,
  Ti: 47.867, V: 50.942, Cr: 51.996, Mn: 54.938, Fe: 55.845,
  Co: 58.933, Ni: 58.693, Cu: 63.546, Zn: 65.38, Ga: 69.723,
  Ge: 72.630, As: 74.922, Se: 78.971, Br: 79.904, Kr: 83.798,
  Rb: 85.468, Sr: 87.62, Y: 88.906, Zr: 91.224, Nb: 92.906,
  Mo: 95.96, Tc: 98, Ru: 101.07, Rh: 102.906, Pd: 106.42,
  Ag: 107.868, Cd: 112.414, In: 114.818, Sn: 118.710, Sb: 121.760,
  Te: 127.60, I: 126.90, Xe: 131.293, Cs: 132.905, Ba: 137.327,
  La: 138.905, Au: 196.967, Hg: 200.592, Pb: 207.2, Bi: 208.980,
  // Add more common elements as needed
};

export function ChemistryMolarMassCalculator() {
  const [formula, setFormula] = useState<string>("");
  const [molarMass, setMolarMass] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormula(e.target.value);
    setError(null);
    setMolarMass(null);
  };

  const parseFormula = (chemFormula: string): Record<string, number> | null => {
    const elementsCount: Record<string, number> = {};
    // Regex to match elements (e.g., C, Cl, Na) and their optional counts (e.g., H2, O3)
    // This simple regex does not handle parentheses or complex structures.
    const regex = /([A-Z][a-z]?)(\d*)/g;
    let match;
    let lastIndex = 0;

    while ((match = regex.exec(chemFormula)) !== null) {
      const element = match[1];
      const count = match[2] ? parseInt(match[2], 10) : 1;

      if (!atomicMasses[element]) {
        setError(`Element "${element}" is not recognized or not in the database.`);
        return null;
      }

      elementsCount[element] = (elementsCount[element] || 0) + count;
      lastIndex = regex.lastIndex;
    }
    
    // Check if the entire formula was parsed
    if (lastIndex !== chemFormula.length) {
        setError("Invalid formula syntax. Please check for errors or unsupported characters/structures (e.g. parentheses).");
        return null;
    }


    if (Object.keys(elementsCount).length === 0 && chemFormula.trim() !== "") {
        setError("Could not parse the formula. Please enter a valid chemical formula (e.g., H2O, C6H12O6).");
        return null;
    }
    
    return elementsCount;
  };

  const handleCalculate = () => {
    setError(null);
    setMolarMass(null);

    if (formula.trim() === "") {
      setError("Please enter a chemical formula.");
      return;
    }
    if (/\(.*\)/.test(formula)) {
        setError("Formulas with parentheses, like Ca(OH)2, are not currently supported in this basic version.");
        return;
    }


    const elements = parseFormula(formula);
    if (!elements) {
      // Error already set by parseFormula
      return;
    }

    let totalMass = 0;
    for (const element in elements) {
      totalMass += atomicMasses[element] * elements[element];
    }

    setMolarMass(totalMass.toFixed(3)); // Common to have 2-3 decimal places for molar mass
  };

  const handleClear = () => {
    setFormula("");
    setMolarMass(null);
    setError(null);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1.5">
        <Label htmlFor="formula" className="flex items-center">
          <FlaskConical className="mr-2 h-4 w-4 text-muted-foreground" />
          Chemical Formula
        </Label>
        <Input
          id="formula"
          type="text"
          placeholder="e.g., H2O, C6H12O6, NaCl"
          value={formula}
          onChange={handleInputChange}
          aria-label="Chemical Formula"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <Button onClick={handleCalculate} className="w-full sm:w-auto flex-grow">
          <Calculator className="mr-2 h-4 w-4" /> Calculate Molar Mass
        </Button>
        <Button onClick={handleClear} variant="outline" className="w-full sm:w-auto">
          <Eraser className="mr-2 h-4 w-4" /> Clear
        </Button>
      </div>

      {error && (
        <Card className="bg-destructive/10 border-destructive/50">
          <CardHeader className="py-2 px-3"><CardTitle className="flex items-center text-destructive text-sm"><AlertCircle className="mr-2 h-4 w-4" />Error</CardTitle></CardHeader>
          <CardContent className="py-2 px-3"><p className="text-destructive text-sm">{error}</p></CardContent>
        </Card>
      )}

      {molarMass !== null && (
        <Card className="bg-accent/10 border-accent/50">
          <CardHeader className="py-3 px-4"><CardTitle className="flex items-center text-primary text-base"><FlaskConical className="mr-2 h-5 w-5" />Molar Mass</CardTitle></CardHeader>
          <CardContent className="p-4">
            <p className="text-2xl font-semibold text-primary">{molarMass} g/mol</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
