
"use client";

import { useState, type ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Calculator, Eraser } from "lucide-react";

export function LcmHcfCalculator() {
  const [num1, setNum1] = useState<string>("");
  const [num2, setNum2] = useState<string>("");
  const [lcm, setLcm] = useState<number | null>(null);
  const [hcf, setHcf] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculateHcf = (a: number, b: number): number => {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b) {
      [a, b] = [b, a % b];
    }
    return a;
  };

  const calculateLcm = (a: number, b: number, h: number): number => {
    if (h === 0) return 0; // LCM of (a,0) or (0,b) or (0,0) is 0
    return Math.abs(a * b) / h;
  };

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => 
    (e: ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value);
    setError(null);
    setLcm(null);
    setHcf(null);
  };

  const handleCalculate = () => {
    setError(null);
    setLcm(null);
    setHcf(null);

    const n1 = parseInt(num1, 10);
    const n2 = parseInt(num2, 10);

    if (isNaN(n1) || isNaN(n2)) {
      setError("Please enter valid integers for both numbers.");
      return;
    }
    
    if (!Number.isInteger(parseFloat(num1)) || !Number.isInteger(parseFloat(num2))) {
        setError("Please enter whole numbers (integers) only.");
        return;
    }

    if (n1 === 0 && n2 === 0) {
      setHcf(0); // Or undefined, depending on convention. For simplicity, 0.
      setLcm(0);
      return;
    }

    const calculatedHcf = calculateHcf(n1, n2);
    setHcf(calculatedHcf);

    const calculatedLcm = calculateLcm(n1, n2, calculatedHcf);
    setLcm(calculatedLcm);
  };

  const handleClear = () => {
    setNum1("");
    setNum2("");
    setLcm(null);
    setHcf(null);
    setError(null);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="num1">First Number</Label>
          <Input
            id="num1"
            type="number"
            placeholder="e.g., 12"
            value={num1}
            onChange={handleInputChange(setNum1)}
            aria-label="First number"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="num2">Second Number</Label>
          <Input
            id="num2"
            type="number"
            placeholder="e.g., 18"
            value={num2}
            onChange={handleInputChange(setNum2)}
            aria-label="Second number"
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <Button onClick={handleCalculate} className="w-full sm:w-auto flex-grow">
          <Calculator className="mr-2 h-4 w-4" /> Calculate LCM & HCF
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

      {(lcm !== null || hcf !== null) && (
        <Card className="bg-accent/10 border-accent/50">
          <CardHeader className="py-3 px-4">
            <CardTitle className="flex items-center text-primary text-base">
              <Calculator className="mr-2 h-5 w-5" /> Results
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-2">
            {hcf !== null && (
              <p className="text-lg">
                Highest Common Factor (HCF/GCD): <span className="font-semibold text-primary">{hcf.toLocaleString()}</span>
              </p>
            )}
            {lcm !== null && (
              <p className="text-lg">
                Least Common Multiple (LCM): <span className="font-semibold text-primary">{lcm.toLocaleString()}</span>
              </p>
            )}
          </CardContent>
        </Card>
      )}
       <Card className="bg-muted/30 mt-6">
        <CardHeader className="py-2 px-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">How to use:</CardTitle>
        </CardHeader>
        <CardContent className="text-sm py-2 px-3 text-muted-foreground">
            <p>Enter two integers. Click 'Calculate LCM &amp; HCF' to see their Highest Common Factor (HCF or GCD) and Least Common Multiple (LCM).</p>
        </CardContent>
      </Card>
    </div>
  );
}
