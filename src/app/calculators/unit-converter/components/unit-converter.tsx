
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
import { AlertCircle, Eraser, Replace } from "lucide-react";

type LengthUnit = 
  | "meter" | "kilometer" | "centimeter" | "millimeter"
  | "mile" | "yard" | "foot" | "inch";

const lengthUnits: { value: LengthUnit; label: string }[] = [
  { value: "meter", label: "Meter (m)" },
  { value: "kilometer", label: "Kilometer (km)" },
  { value: "centimeter", label: "Centimeter (cm)" },
  { value: "millimeter", label: "Millimeter (mm)" },
  { value: "mile", label: "Mile (mi)" },
  { value: "yard", label: "Yard (yd)" },
  { value: "foot", label: "Foot (ft)" },
  { value: "inch", label: "Inch (in)" },
];

// Conversion factors to meters (base unit)
const factorsToMeter: Record<LengthUnit, number> = {
  meter: 1,
  kilometer: 1000,
  centimeter: 0.01,
  millimeter: 0.001,
  mile: 1609.34,
  yard: 0.9144,
  foot: 0.3048,
  inch: 0.0254,
};

export function UnitConverter() {
  const [inputValue, setInputValue] = useState<string>("1");
  const [fromUnit, setFromUnit] = useState<LengthUnit>("meter");
  const [toUnit, setToUnit] = useState<LengthUnit>("foot");
  const [result, setResult] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (inputValue.trim() === "") {
      setResult("");
      setError(null);
      return;
    }

    const numValue = parseFloat(inputValue);
    if (isNaN(numValue)) {
      setError("Please enter a valid number for conversion.");
      setResult("");
      return;
    }
    setError(null);

    const valueInMeters = numValue * factorsToMeter[fromUnit];
    const convertedValue = valueInMeters / factorsToMeter[toUnit];

    if (!isFinite(convertedValue)) {
        setError("Calculation resulted in an invalid number (e.g. division by zero with factors).");
        setResult("");
        return;
    }

    // Determine significant digits for display
    let precision = 5;
    if (Math.abs(convertedValue) > 1000 || (Math.abs(convertedValue) < 0.001 && convertedValue !== 0) ) {
        setResult(convertedValue.toExponential(5)); // Use exponential for very large/small numbers
    } else {
        // Adjust precision based on magnitude for better readability
        if (Math.abs(convertedValue) < 1) precision = 7;
        else if (Math.abs(convertedValue) < 100) precision = 6;
        setResult(Number(convertedValue.toFixed(precision)).toString());
    }

  }, [inputValue, fromUnit, toUnit]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleFromUnitChange = (value: string) => {
    setFromUnit(value as LengthUnit);
  };

  const handleToUnitChange = (value: string) => {
    setToUnit(value as LengthUnit);
  };
  
  const handleSwapUnits = () => {
    const currentFrom = fromUnit;
    const currentTo = toUnit;
    const currentValue = inputValue;
    const currentResult = result;

    setFromUnit(currentTo);
    setToUnit(currentFrom);
    
    // If result has a value, make it the new input. Otherwise, keep input.
    if (currentResult && !isNaN(parseFloat(currentResult))) {
        setInputValue(currentResult);
    }
  };


  const handleClear = () => {
    setInputValue("1");
    setFromUnit("meter");
    setToUnit("foot");
    setResult("");
    setError(null);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 items-end">
        <div className="space-y-1.5">
          <Label htmlFor="inputValue">Value</Label>
          <Input
            id="inputValue"
            type="number"
            step="any"
            placeholder="Enter value"
            value={inputValue}
            onChange={handleInputChange}
            aria-label="Value to convert"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2">
            <div className="space-y-1.5 w-full">
            <Label htmlFor="fromUnit">From Unit</Label>
            <Select value={fromUnit} onValueChange={handleFromUnitChange}>
                <SelectTrigger id="fromUnit" aria-label="Select from unit">
                <SelectValue />
                </SelectTrigger>
                <SelectContent>
                {lengthUnits.map((unit) => (
                    <SelectItem key={unit.value} value={unit.value}>{unit.label}</SelectItem>
                ))}
                </SelectContent>
            </Select>
            </div>

            <Button variant="outline" size="icon" onClick={handleSwapUnits} className="mt-4 sm:mt-6" aria-label="Swap units">
                <Replace className="h-4 w-4" />
            </Button>

            <div className="space-y-1.5 w-full">
            <Label htmlFor="toUnit">To Unit</Label>
            <Select value={toUnit} onValueChange={handleToUnitChange}>
                <SelectTrigger id="toUnit" aria-label="Select to unit">
                <SelectValue />
                </SelectTrigger>
                <SelectContent>
                {lengthUnits.map((unit) => (
                    <SelectItem key={unit.value} value={unit.value}>{unit.label}</SelectItem>
                ))}
                </SelectContent>
            </Select>
            </div>
        </div>
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

      {result && !error && (
        <Card className="bg-accent/10 border-accent/50">
          <CardHeader className="py-3 px-4">
            <CardTitle className="flex items-center text-primary text-base">
                Result
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-2xl font-semibold text-primary break-all">{result}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {inputValue} {lengthUnits.find(u => u.value === fromUnit)?.label} = {result} {lengthUnits.find(u => u.value === toUnit)?.label}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
