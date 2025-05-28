
"use client";

import { useState, type ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Calculator, Eraser } from "lucide-react";

export function ExponentCalculator() {
  const [base, setBase] = useState<string>("");
  const [exponent, setExponent] = useState<string>("");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => 
    (e: ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value);
    setError(null);
    setResult(null);
  };

  const handleCalculate = () => {
    setError(null);
    setResult(null);

    const baseNum = parseFloat(base);
    const exponentNum = parseFloat(exponent);

    if (isNaN(baseNum) || isNaN(exponentNum)) {
      setError("Please enter valid numbers for both base and exponent.");
      return;
    }

    // Specific case: 0^0 is conventionally 1 in many contexts
    if (baseNum === 0 && exponentNum === 0) {
        setResult("1");
        return;
    }
    
    // Specific case: 0 to a negative power is Infinity
    if (baseNum === 0 && exponentNum < 0) {
        setError("Result is undefined (0 to a negative power).");
        return;
    }


    const calculatedResult = Math.pow(baseNum, exponentNum);

    if (!isFinite(calculatedResult)) {
      setError("Result is too large or undefined (e.g., division by zero from negative exponent).");
      return;
    }
    
    // Limit precision to avoid overly long numbers, e.g. 10 decimal places
    // Convert to string and then back to number to remove trailing zeros if it's a whole number after toFixed
    setResult(Number(calculatedResult.toFixed(10)).toString()); 
  };

  const handleClear = () => {
    setBase("");
    setExponent("");
    setResult(null);
    setError(null);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="base">Base</Label>
          <Input
            id="base"
            type="number"
            step="any"
            placeholder="e.g., 2"
            value={base}
            onChange={handleInputChange(setBase)}
            aria-label="Base number"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="exponent">Exponent</Label>
          <Input
            id="exponent"
            type="number"
            step="any"
            placeholder="e.g., 3"
            value={exponent}
            onChange={handleInputChange(setExponent)}
            aria-label="Exponent (power)"
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <Button onClick={handleCalculate} className="w-full sm:w-auto flex-grow">
          <Calculator className="mr-2 h-4 w-4" /> Calculate (Base ^ Exponent)
        </Button>
        <Button onClick={handleClear} variant="outline" className="w-full sm:w-auto">
          <Eraser className="mr-2 h-4 w-4" /> Clear
        </Button>
      </div>

      {error && (
        <Card className="bg-destructive/10 border-destructive/50">
          <CardHeader className="py-2 px-3">
            <CardTitle className="flex items-center text-destructive text-sm">
              <AlertCircle className="mr-2 h-4 w-4" /> Error
            </CardTitle>
          </CardHeader>
          <CardContent className="py-2 px-3">
            <p className="text-destructive text-sm">{error}</p>
          </CardContent>
        </Card>
      )}

      {result !== null && (
        <Card className="bg-accent/10 border-accent/50">
          <CardHeader className="py-3 px-4">
            <CardTitle className="flex items-center text-primary text-base">
              <Calculator className="mr-2 h-5 w-5" /> Result
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-lg font-semibold text-foreground">
              {base} ^ {exponent} = <span className="text-primary">{result}</span>
            </p>
          </CardContent>
        </Card>
      )}
       <Card className="bg-muted/30 mt-6">
        <CardHeader className="py-2 px-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">How to use:</CardTitle>
        </CardHeader>
        <CardContent className="text-sm py-2 px-3 text-muted-foreground">
            <p>Enter a base number and an exponent (power). Click 'Calculate' to find the result of the base raised to the power of the exponent.</p>
        </CardContent>
      </Card>
    </div>
  );
}
