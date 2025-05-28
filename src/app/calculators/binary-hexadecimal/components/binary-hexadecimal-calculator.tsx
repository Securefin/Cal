
"use client";

import { useState, useEffect, type ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Eraser, Binary as BinaryIcon } from "lucide-react";

type NumberBase = "bin" | "dec" | "hex";

interface ConversionResult {
  binary: string;
  decimal: string;
  hexadecimal: string;
}

export function BinaryHexadecimalCalculator() {
  const [inputValue, setInputValue] = useState<string>("");
  const [inputBase, setInputBase] = useState<NumberBase>("dec");
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (inputValue.trim() === "") {
      setResult(null);
      setError(null);
      return;
    }

    let currentError: string | null = null;
    let decValue: number | null = null;

    // Validate input based on selected base
    if (inputBase === "bin") {
      if (!/^[01]+$/.test(inputValue)) {
        currentError = "Binary input can only contain 0s and 1s.";
      } else {
        decValue = parseInt(inputValue, 2);
      }
    } else if (inputBase === "dec") {
      if (!/^[0-9]+$/.test(inputValue)) {
        currentError = "Decimal input can only contain digits 0-9.";
      } else {
        decValue = parseInt(inputValue, 10);
      }
    } else if (inputBase === "hex") {
      if (!/^[0-9A-Fa-f]+$/.test(inputValue)) {
        currentError = "Hexadecimal input can only contain 0-9 and A-F.";
      } else {
        decValue = parseInt(inputValue, 16);
      }
    }

    if (currentError) {
      setError(currentError);
      setResult(null);
      return;
    }

    if (decValue === null || isNaN(decValue)) {
      // This might happen if parseInt fails for some reason despite regex, e.g. very large numbers beyond safe int.
      // For base conversion, toString on Number handles larger values as strings correctly.
      if (inputBase === "dec") decValue = Number(inputValue); // Allow larger numbers for decimal input
      else {
        setError("Invalid number for selected base or number too large to parse accurately as integer for intermediate conversion.");
        setResult(null);
        return;
      }
    }
    
    if (isNaN(Number(decValue))) { // Final check if decValue became NaN
         setError("Failed to convert input to a valid decimal number.");
         setResult(null);
         return;
    }


    setError(null);
    setResult({
      binary: Number(decValue).toString(2),
      decimal: Number(decValue).toString(10),
      hexadecimal: Number(decValue).toString(16).toUpperCase(),
    });

  }, [inputValue, inputBase]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleBaseChange = (value: string) => {
    setInputBase(value as NumberBase);
  };

  const handleClear = () => {
    setInputValue("");
    setInputBase("dec");
    setResult(null);
    setError(null);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4 items-end">
        <div className="space-y-1.5">
          <Label htmlFor="inputValue">Input Value</Label>
          <Input
            id="inputValue"
            type="text"
            placeholder="Enter number"
            value={inputValue}
            onChange={handleInputChange}
            aria-label="Number to convert"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="inputBase">Input Base</Label>
          <Select value={inputBase} onValueChange={handleBaseChange}>
            <SelectTrigger id="inputBase" aria-label="Select input base">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bin">Binary</SelectItem>
              <SelectItem value="dec">Decimal</SelectItem>
              <SelectItem value="hex">Hexadecimal</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Button onClick={handleClear} variant="outline" className="w-full">
        <Eraser className="mr-2 h-4 w-4" /> Clear All
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

      {result && !error && (
        <div className="space-y-4">
          <Card>
            <CardHeader className="py-2 px-3 bg-muted/30 rounded-t-lg">
              <CardTitle className="text-base text-muted-foreground flex items-center">
                <BinaryIcon className="mr-2 h-4 w-4" /> Binary
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 text-lg font-mono break-all">
              {result.binary || "N/A"}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="py-2 px-3 bg-muted/30 rounded-t-lg">
              <CardTitle className="text-base text-muted-foreground flex items-center">
                # Decimal
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 text-lg font-mono break-all">
              {result.decimal || "N/A"}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="py-2 px-3 bg-muted/30 rounded-t-lg">
              <CardTitle className="text-base text-muted-foreground flex items-center">
                0x Hexadecimal
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 text-lg font-mono break-all">
              {result.hexadecimal || "N/A"}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
