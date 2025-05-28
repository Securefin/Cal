
"use client";

import { useState } from "react";
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
import { AlertCircle, Calculator } from "lucide-react";

type CalculationType = 
  | "percentOfNumber" 
  | "numberIsWhatPercentOf" 
  | "percentageIncreaseDecrease";

export function PercentageCalculator() {
  const [calcType, setCalcType] = useState<CalculationType>("percentOfNumber");
  const [valueA, setValueA] = useState<string>("");
  const [valueB, setValueB] = useState<string>("");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    setError(null);
    setResult(null);
    const numA = parseFloat(valueA);
    const numB = parseFloat(valueB);

    if (isNaN(numA) || (calcType !== "percentageIncreaseDecrease" && isNaN(numB)) || (calcType === "percentageIncreaseDecrease" && (isNaN(numB) && valueB !== ""))) {
        if (calcType === "percentageIncreaseDecrease" && isNaN(numA)) {
             setError("Please enter a valid 'Original Value'.");
             return;
        }
        if (calcType === "percentageIncreaseDecrease" && isNaN(numB) && valueB.trim() !== "") {
             setError("Please enter a valid 'New Value' or leave it empty for 'Original Value' only calculation.");
             return;
        }
         if (isNaN(numA) && isNaN(numB)) {
            setError("Please enter valid numbers for both inputs.");
            return;
        }
        if (isNaN(numA)) {
            setError(`Please enter a valid number for ${calcType === "percentOfNumber" ? "'Percentage'" : "'Value X'"}.`);
            return;
        }
        if (isNaN(numB)) {
            setError(`Please enter a valid number for ${calcType === "percentOfNumber" ? "'Value'" : "'Value Y'"}.`);
            return;
        }
    }


    let calculatedResult: number | null = null;

    switch (calcType) {
      case "percentOfNumber":
        if (isNaN(numA) || isNaN(numB)) {
          setError("Inputs for 'What is X% of Y?' must be numbers."); return;
        }
        calculatedResult = (numA / 100) * numB;
        setResult(`${numA}% of ${numB} is ${calculatedResult.toLocaleString()}`);
        break;
      case "numberIsWhatPercentOf":
        if (isNaN(numA) || isNaN(numB)) {
          setError("Inputs for 'X is what % of Y?' must be numbers."); return;
        }
        if (numB === 0) {
          setError("Cannot divide by zero (Value Y cannot be 0).");
          return;
        }
        calculatedResult = (numA / numB) * 100;
        setResult(`${numA} is ${calculatedResult.toLocaleString()}% of ${numB}`);
        break;
      case "percentageIncreaseDecrease":
        if (isNaN(numA)) {
            setError("Original Value must be a number."); return;
        }
        if (valueB.trim() === "") { // Only original value provided
            setResult(`Original Value: ${numA.toLocaleString()}`);
            return;
        }
        if (isNaN(numB)) {
            setError("New Value must be a number if provided."); return;
        }
        if (numA === 0 && numB !== 0) {
            setError("Cannot calculate percentage change from zero to a non-zero value in a standard way. The increase is infinitely large.");
            return;
        }
        if (numA === 0 && numB === 0) {
            setResult(`From ${numA.toLocaleString()} to ${numB.toLocaleString()} is a 0% change.`);
            return;
        }
        
        calculatedResult = ((numB - numA) / numA) * 100;
        const changeType = numB >= numA ? "increase" : "decrease";
        setResult(
          `From ${numA.toLocaleString()} to ${numB.toLocaleString()} is a ${Math.abs(calculatedResult).toLocaleString()}% ${changeType}.`
        );
        break;
      default:
        setError("Invalid calculation type selected.");
    }
  };

  const handleClear = () => {
    setValueA("");
    setValueB("");
    setResult(null);
    setError(null);
  };

  const renderInputs = () => {
    switch (calcType) {
      case "percentOfNumber":
        return (
          <>
            <div className="space-y-1.5">
              <Label htmlFor="valueA">Percentage (X)</Label>
              <Input
                id="valueA"
                type="number"
                placeholder="e.g., 10"
                value={valueA}
                onChange={(e) => setValueA(e.target.value)}
                aria-label="Percentage (X)"
              />
            </div>
            <div className="text-center text-muted-foreground self-center pt-6">is</div>
            <div className="space-y-1.5">
              <Label htmlFor="valueB">Total Value (Y)</Label>
              <Input
                id="valueB"
                type="number"
                placeholder="e.g., 50"
                value={valueB}
                onChange={(e) => setValueB(e.target.value)}
                aria-label="Total Value (Y)"
              />
            </div>
          </>
        );
      case "numberIsWhatPercentOf":
        return (
          <>
            <div className="space-y-1.5">
              <Label htmlFor="valueA">Value (X)</Label>
              <Input
                id="valueA"
                type="number"
                placeholder="e.g., 5"
                value={valueA}
                onChange={(e) => setValueA(e.target.value)}
                aria-label="Value (X)"
              />
            </div>
             <div className="text-center text-muted-foreground self-center pt-6">is what % of</div>
            <div className="space-y-1.5">
              <Label htmlFor="valueB">Total Value (Y)</Label>
              <Input
                id="valueB"
                type="number"
                placeholder="e.g., 50"
                value={valueB}
                onChange={(e) => setValueB(e.target.value)}
                aria-label="Total Value (Y)"
              />
            </div>
          </>
        );
      case "percentageIncreaseDecrease":
        return (
          <>
            <div className="space-y-1.5">
              <Label htmlFor="valueA">Original Value</Label>
              <Input
                id="valueA"
                type="number"
                placeholder="e.g., 100"
                value={valueA}
                onChange={(e) => setValueA(e.target.value)}
                aria-label="Original Value"
              />
            </div>
            <div className="text-center text-muted-foreground self-center pt-6">to</div>
            <div className="space-y-1.5">
              <Label htmlFor="valueB">New Value</Label>
              <Input
                id="valueB"
                type="number"
                placeholder="e.g., 120"
                value={valueB}
                onChange={(e) => setValueB(e.target.value)}
                aria-label="New Value"
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="calcTypeSelect">Select Calculation Type</Label>
        <Select
          value={calcType}
          onValueChange={(value: string) => {
            setCalcType(value as CalculationType);
            setResult(null);
            setError(null);
            setValueA("");
            setValueB("");
          }}
        >
          <SelectTrigger id="calcTypeSelect" aria-label="Select calculation type">
            <SelectValue placeholder="Select calculation type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="percentOfNumber">What is X% of Y?</SelectItem>
            <SelectItem value="numberIsWhatPercentOf">X is what % of Y?</SelectItem>
            <SelectItem value="percentageIncreaseDecrease">Percentage Increase/Decrease</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-4 items-start">
        {renderInputs()}
      </div>
      
      <div className="flex flex-col sm:flex-row gap-2">
        <Button onClick={handleCalculate} className="w-full sm:w-auto flex-grow">
          <Calculator className="mr-2 h-4 w-4" /> Calculate
        </Button>
        <Button onClick={handleClear} variant="outline" className="w-full sm:w-auto">
          Clear
        </Button>
      </div>

      {error && (
        <Card className="bg-destructive/10 border-destructive/50">
          <CardHeader>
            <CardTitle className="flex items-center text-destructive text-base">
              <AlertCircle className="mr-2 h-5 w-5" /> Error
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-destructive">{error}</p>
          </CardContent>
        </Card>
      )}

      {result && (
        <Card className="bg-accent/10 border-accent/50">
          <CardHeader>
            <CardTitle className="flex items-center text-primary text-base">
              <Calculator className="mr-2 h-5 w-5" /> Result
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold text-foreground">{result}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
