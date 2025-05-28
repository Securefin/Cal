
"use client";

import { useState, type ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Calculator, Eraser } from "lucide-react";

export function ModuloCalculator() {
  const [dividend, setDividend] = useState<string>("");
  const [divisor, setDivisor] = useState<string>("");
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

    const dividendNum = parseFloat(dividend);
    const divisorNum = parseFloat(divisor);

    if (isNaN(dividendNum) || isNaN(divisorNum)) {
      setError("Please enter valid numbers for both dividend and divisor.");
      return;
    }

    if (divisorNum === 0) {
      setError("Divisor cannot be zero.");
      return;
    }

    const calculatedResult = dividendNum % divisorNum;
    
    // JavaScript's % operator can return negative results if the dividend is negative.
    // Modulo operation typically expected to yield a result with the same sign as the divisor or always non-negative.
    // For simplicity and common programming behavior, we'll stick to JS % result.
    // If specific mathematical modulo (always non-negative) is needed:
    // let calculatedResult = ((dividendNum % divisorNum) + divisorNum) % divisorNum;
    // However, this changes behavior for positive divisors where JS % is already standard.

    setResult(Number(calculatedResult.toFixed(10)).toString()); // Limit precision
  };

  const handleClear = () => {
    setDividend("");
    setDivisor("");
    setResult(null);
    setError(null);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="dividend">Dividend</Label>
          <Input
            id="dividend"
            type="number"
            step="any"
            placeholder="e.g., 10"
            value={dividend}
            onChange={handleInputChange(setDividend)}
            aria-label="Dividend"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="divisor">Divisor</Label>
          <Input
            id="divisor"
            type="number"
            step="any"
            placeholder="e.g., 3"
            value={divisor}
            onChange={handleInputChange(setDivisor)}
            aria-label="Divisor"
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <Button onClick={handleCalculate} className="w-full sm:w-auto flex-grow">
          <Calculator className="mr-2 h-4 w-4" /> Calculate (Dividend % Divisor)
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
              {dividend} % {divisor} = <span className="text-primary">{result}</span>
            </p>
          </CardContent>
        </Card>
      )}
      <Card className="bg-muted/30 mt-6">
        <CardHeader className="py-2 px-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">How to use:</CardTitle>
        </CardHeader>
        <CardContent className="text-sm py-2 px-3 text-muted-foreground">
            <p>Enter the dividend (the number to be divided) and the divisor. Click 'Calculate' to find the remainder of the division.</p>
            <p className="mt-1">For example, 10 mod 3 = 1.</p>
        </CardContent>
      </Card>
    </div>
  );
}
