
"use client";

import { useState, type ChangeEvent } from "react";
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
import { AlertCircle, Calculator, Eraser } from "lucide-react";

type LogType = "ln" | "log10" | "logBaseB";

export function LogarithmCalculator() {
  const [logType, setLogType] = useState<LogType>("ln");
  const [numberInput, setNumberInput] = useState<string>("");
  const [baseInput, setBaseInput] = useState<string>("");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => 
    (e: ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value);
    setError(null);
    setResult(null);
  };

  const handleLogTypeChange = (value: string) => {
    setLogType(value as LogType);
    setResult(null);
    setError(null);
    // Clear baseInput if not "logBaseB"
    if (value !== "logBaseB") {
      setBaseInput("");
    }
  };

  const handleCalculate = () => {
    setError(null);
    setResult(null);

    const num = parseFloat(numberInput);

    if (isNaN(num)) {
      setError("Please enter a valid number.");
      return;
    }
    if (num <= 0) {
      setError("The number for logarithm calculation must be greater than 0.");
      return;
    }

    let calculatedResult: number;

    switch (logType) {
      case "ln":
        calculatedResult = Math.log(num);
        setResult(Number(calculatedResult.toFixed(10)).toString());
        break;
      case "log10":
        calculatedResult = Math.log10(num);
        setResult(Number(calculatedResult.toFixed(10)).toString());
        break;
      case "logBaseB":
        const base = parseFloat(baseInput);
        if (isNaN(base)) {
          setError("Please enter a valid base.");
          return;
        }
        if (base <= 0 || base === 1) {
          setError("Base must be greater than 0 and not equal to 1.");
          return;
        }
        calculatedResult = Math.log(num) / Math.log(base);
        setResult(Number(calculatedResult.toFixed(10)).toString());
        break;
      default:
        setError("Invalid logarithm type selected.");
        return;
    }

    if (!isFinite(calculatedResult)) {
        setError("Result is undefined or too large (e.g. log of number close to zero).");
        setResult(null);
    }
  };

  const handleClear = () => {
    setNumberInput("");
    setBaseInput("");
    setResult(null);
    setError(null);
    setLogType("ln");
  };
  
  const getLogSymbol = () => {
    if (logType === 'ln') return `ln(${numberInput || 'x'})`;
    if (logType === 'log10') return `log₁₀(${numberInput || 'x'})`;
    if (logType === 'logBaseB') return `log${baseInput || 'b'}(${numberInput || 'x'})`;
    return "Result";
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1.5">
        <Label htmlFor="logTypeSelect">Logarithm Type</Label>
        <Select value={logType} onValueChange={handleLogTypeChange}>
          <SelectTrigger id="logTypeSelect" aria-label="Select logarithm type">
            <SelectValue placeholder="Select log type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ln">Natural Log (ln)</SelectItem>
            <SelectItem value="log10">Common Log (log₁₀)</SelectItem>
            <SelectItem value="logBaseB">Log base b (log&#x1D62_)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="numberInput">Number (x)</Label>
          <Input
            id="numberInput"
            type="number"
            step="any"
            placeholder="e.g., 10"
            value={numberInput}
            onChange={handleInputChange(setNumberInput)}
            aria-label="Number for logarithm"
          />
        </div>
        {logType === "logBaseB" && (
          <div className="space-y-1.5">
            <Label htmlFor="baseInput">Base (b)</Label>
            <Input
              id="baseInput"
              type="number"
              step="any"
              placeholder="e.g., 2"
              value={baseInput}
              onChange={handleInputChange(setBaseInput)}
              aria-label="Base for logarithm"
            />
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <Button onClick={handleCalculate} className="w-full sm:w-auto flex-grow">
          <Calculator className="mr-2 h-4 w-4" /> Calculate
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
              {getLogSymbol()} = <span className="text-primary">{result}</span>
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
                <li>Select the type of logarithm you want to calculate.</li>
                <li>Enter the number (x).</li>
                <li>If you chose "Log base b", also enter the base (b).</li>
                <li>Click 'Calculate' to see the result.</li>
                <li><strong>Note:</strong> The number (x) must be positive. The base (b) must be positive and not equal to 1.</li>
            </ul>
        </CardContent>
      </Card>
    </div>
  );
}
