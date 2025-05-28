
"use client";

import { useState, type ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Calculator, Eraser, Sigma } from "lucide-react";

export function ScientificNotationCalculator() {
  const [inputValue, setInputValue] = useState<string>("");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setError(null);
    setResult(null);
  };

  const toScientific = () => {
    setError(null);
    setResult(null);
    const num = parseFloat(inputValue);
    if (isNaN(num)) {
      setError("Invalid input. Please enter a valid number.");
      return;
    }
    if (num === 0) {
      setResult("0e+0"); // Or "0", depending on preference
      return;
    }
    setResult(num.toExponential());
  };

  const toStandard = () => {
    setError(null);
    setResult(null);
    
    // Check if input looks like scientific notation
    const sciNotationRegex = /^[+\-]?(\d+(\.\d*)?|\.\d+)([eE][+\-]?\d+)$/;
    if (!sciNotationRegex.test(inputValue) && !isNaN(parseFloat(inputValue))) {
      // If it's a plain number, just set it as result (or format if needed)
      const num = parseFloat(inputValue);
       // Try to format to avoid JS's default scientific notation for large/small numbers
      if (Math.abs(num) < 1e-6 || Math.abs(num) >= 1e+21) {
        setResult(num.toString()); // For very extreme numbers, string conversion is okay
      } else {
        // toLocaleString with options to prevent grouping and control decimals
        setResult(num.toLocaleString('en-US', { useGrouping: false, maximumFractionDigits: 20 }));
      }
      return;
    } else if (!sciNotationRegex.test(inputValue)) {
        setError("Invalid input. Please enter a number in scientific notation (e.g., 1.23e+4 or -5.6E-3) or a standard number.");
        return;
    }


    try {
      const num = parseFloat(inputValue);
      if (isNaN(num)) {
        setError("Invalid scientific notation format.");
        return;
      }
      
      // For very small or very large numbers, direct toString() might revert to scientific.
      // We attempt to provide a full string representation.
      // This can be tricky for extreme precision or very large exponents.
      if (Math.abs(num) < 1e-6 && num !== 0) { // Handle small numbers
         setResult(num.toFixed(20).replace(/\.?0+$/, "")); // toFixed then remove trailing zeros
      } else if (Math.abs(num) >= 1e+21) { // Handle large numbers
         setResult(num.toString()); // Standard toString might be scientific, this is a hard problem
      }
       else {
         setResult(num.toLocaleString('en-US', { useGrouping: false, maximumFractionDigits: 20 }));
      }

    } catch (e) {
      setError("Error converting to standard decimal. Ensure valid scientific notation.");
    }
  };

  const handleClear = () => {
    setInputValue("");
    setResult(null);
    setError(null);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1.5">
        <Label htmlFor="inputValue">Enter Number</Label>
        <Input
          id="inputValue"
          type="text"
          placeholder="e.g., 12345 or 1.2345e+4"
          value={inputValue}
          onChange={handleInputChange}
          aria-label="Number input for scientific notation conversion"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <Button onClick={toScientific} className="w-full">
          <Sigma className="mr-2 h-4 w-4" /> To Scientific Notation
        </Button>
        <Button onClick={toStandard} className="w-full">
          <Sigma className="mr-2 h-4 w-4" /> To Standard Decimal
        </Button>
      </div>
      <Button onClick={handleClear} variant="outline" className="w-full">
        <Eraser className="mr-2 h-4 w-4" /> Clear
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

      {result !== null && (
        <Card className="bg-accent/10 border-accent/50">
          <CardHeader className="py-3 px-4">
            <CardTitle className="flex items-center text-primary text-base">
              <Calculator className="mr-2 h-5 w-5" /> Result
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-lg font-semibold text-foreground break-all">
              {result}
            </p>
          </CardContent>
        </Card>
      )}
       <Card className="bg-muted/30 mt-6">
        <CardHeader className="py-2 px-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">How to use:</CardTitle>
        </CardHeader>
        <CardContent className="text-sm py-2 px-3 text-muted-foreground">
            <ul className="list-disc pl-5 space-y-1">
                <li>Enter a number in either standard decimal form (e.g., 12345.67) or scientific notation (e.g., 1.234567e+4).</li>
                <li>Click 'To Scientific Notation' to convert a standard number to its exponential form.</li>
                <li>Click 'To Standard Decimal' to convert a number in scientific notation back to its full decimal representation.</li>
            </ul>
        </CardContent>
      </Card>
    </div>
  );
}
