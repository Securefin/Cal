
"use client";

import { useState, useEffect, type ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Calculator } from "lucide-react";

export function RatioCalculator() {
  const [valA, setValA] = useState<string>("");
  const [valB, setValB] = useState<string>("");
  const [valC, setValC] = useState<string>("");
  const [valD, setValD] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const values = { a: valA, b: valB, c: valC, d: valD };
    const numericValues: { [key: string]: number } = {};
    const emptyKeys: string[] = [];
    const nonNumericKeys: string[] = [];

    for (const key of ["a", "b", "c", "d"]) {
      const strVal = values[key as keyof typeof values];
      if (strVal === "") {
        emptyKeys.push(key);
      } else {
        const num = parseFloat(strVal);
        if (isNaN(num)) {
          nonNumericKeys.push(key.toUpperCase());
        } else {
          numericValues[key] = num;
        }
      }
    }

    let newError: string | null = null;

    if (nonNumericKeys.length > 0) {
      newError = `Invalid number in field(s): ${nonNumericKeys.join(", ")}.`;
    } else if (emptyKeys.length === 1 && Object.keys(numericValues).length === 3) {
      const solveKey = emptyKeys[0];
      let result: number | string | null = null;
      const { a, b, c, d } = numericValues; // These will be undefined if not in numericValues

      try {
        if (solveKey === "a") {
          if (d === 0) throw new Error("Cannot divide by zero (D is zero).");
          result = (b * c) / d;
        } else if (solveKey === "b") {
          if (c === 0) throw new Error("Cannot divide by zero (C is zero).");
          result = (a * d) / c;
        } else if (solveKey === "c") {
          if (b === 0) throw new Error("Cannot divide by zero (B is zero).");
          result = (a * d) / b;
        } else if (solveKey === "d") {
          if (a === 0 && b * c !== 0) throw new Error("Cannot calculate D if A is zero and B*C is not zero (implies infinite or undefined D).");
          if (a === 0 && b * c === 0) { // 0:X = 0:Y, result could be anything if X,Y are non-zero. If B or C is also 0, then D can be 0.
             result = 0; // Or could be ambiguous. For simplicity, if 0/A and B*C=0, D=0.
          } else if (a === 0) { // This case should be caught by previous condition or be NaN
            result = NaN;
          }
           else {
            result = (b * c) / a;
          }
        }

        if (typeof result === "number" && !isNaN(result)) {
          const resultStr = Number(result.toFixed(5)).toString(); // Limit precision and remove trailing zeros
          if (solveKey === "a" && valA === "") setValA(resultStr);
          if (solveKey === "b" && valB === "") setValB(resultStr);
          if (solveKey === "c" && valC === "") setValC(resultStr);
          if (solveKey === "d" && valD === "") setValD(resultStr);
        } else if (typeof result === "string") {
            newError = result; // Error message from calculation
        } else if (isNaN(result as number)) {
            newError = "Calculation resulted in an invalid number (e.g., division by zero or indeterminate form).";
        }
      } catch (e: any) {
        newError = e.message || "Calculation error.";
      }
    } else if (emptyKeys.length === 0 && Object.keys(numericValues).length === 4) {
      // All fields filled and valid, do nothing.
    } else if (emptyKeys.length > 1 && Object.keys(numericValues).length < 3 && nonNumericKeys.length === 0) {
      // Not enough info, but no invalid numbers typed yet. Clear errors.
      newError = null; 
    }
     else if (emptyKeys.length === 4) {
        newError = null; // All empty, no error
    }


    setError(newError);
  }, [valA, valB, valC, valD]);

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value);
  };

  const handleClearAll = () => {
    setValA("");
    setValB("");
    setValC("");
    setValD("");
    setError(null);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-center gap-x-2 gap-y-4">
        {/* Row 1: Inputs */}
        <div className="space-y-1">
          <Label htmlFor="valA" className="sr-only">Value A</Label>
          <Input
            id="valA"
            type="text"
            inputMode="decimal"
            placeholder="A"
            value={valA}
            onChange={handleInputChange(setValA)}
            aria-label="Value A of ratio"
            className="text-center"
          />
        </div>
        <span className="text-2xl font-semibold text-muted-foreground">:</span>
        <div className="space-y-1">
          <Label htmlFor="valB" className="sr-only">Value B</Label>
          <Input
            id="valB"
            type="text"
            inputMode="decimal"
            placeholder="B"
            value={valB}
            onChange={handleInputChange(setValB)}
            aria-label="Value B of ratio"
            className="text-center"
          />
        </div>
        
        <span className="text-2xl font-semibold text-center">=</span>
        
        <div className="space-y-1">
          <Label htmlFor="valC" className="sr-only">Value C</Label>
          <Input
            id="valC"
            type="text"
            inputMode="decimal"
            placeholder="C"
            value={valC}
            onChange={handleInputChange(setValC)}
            aria-label="Value C of ratio"
            className="text-center"
          />
        </div>
        <span className="text-2xl font-semibold text-muted-foreground">:</span>
        <div className="space-y-1">
          <Label htmlFor="valD" className="sr-only">Value D</Label>
          <Input
            id="valD"
            type="text"
            inputMode="decimal"
            placeholder="D"
            value={valD}
            onChange={handleInputChange(setValD)}
            aria-label="Value D of ratio"
            className="text-center"
          />
        </div>
      </div>

      <Button onClick={handleClearAll} variant="outline" className="w-full">
        Clear All
      </Button>

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

      <Card className="bg-muted/30">
        <CardHeader className="py-2 px-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">How to use:</CardTitle>
        </CardHeader>
        <CardContent className="text-sm py-2 px-3 text-muted-foreground">
            <p>Enter any three values in the A : B = C : D fields. The calculator will automatically solve for the empty field. If all fields are filled, clear one to calculate it.</p>
        </CardContent>
      </Card>
    </div>
  );
}
