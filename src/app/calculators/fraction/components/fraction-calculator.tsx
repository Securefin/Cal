
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
import { AlertCircle, Calculator as CalculatorIcon } from "lucide-react";

type Operation = "+" | "-" | "*" | "/";

interface FractionResult {
  simplified: string;
  mixed?: string;
  decimal: string;
}

export function FractionCalculator() {
  const [num1, setNum1] = useState<string>("");
  const [den1, setDen1] = useState<string>("");
  const [num2, setNum2] = useState<string>("");
  const [den2, setDen2] = useState<string>("");
  const [operation, setOperation] = useState<Operation>("+");
  const [result, setResult] = useState<FractionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const gcd = (a: number, b: number): number => {
    a = Math.abs(a);
    b = Math.abs(b);
    if (b === 0) {
      return a;
    }
    return gcd(b, a % b);
  };

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => 
    (e: ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value);
    setError(null);
    setResult(null);
  };

  const handleCalculate = () => {
    setError(null);
    setResult(null);

    const n1 = parseInt(num1, 10);
    const d1 = parseInt(den1, 10);
    const n2 = parseInt(num2, 10);
    const d2 = parseInt(den2, 10);

    if (isNaN(n1) || isNaN(d1) || isNaN(n2) || isNaN(d2)) {
      setError("Please enter valid numbers for all fraction parts.");
      return;
    }

    if (d1 === 0 || d2 === 0) {
      setError("Denominators cannot be zero.");
      return;
    }

    let resNum: number;
    let resDen: number;

    switch (operation) {
      case "+":
        resNum = n1 * d2 + n2 * d1;
        resDen = d1 * d2;
        break;
      case "-":
        resNum = n1 * d2 - n2 * d1;
        resDen = d1 * d2;
        break;
      case "*":
        resNum = n1 * n2;
        resDen = d1 * d2;
        break;
      case "/":
        if (n2 === 0) {
          setError("Cannot divide by a zero fraction.");
          return;
        }
        resNum = n1 * d2;
        resDen = d1 * n2;
        break;
      default:
        setError("Invalid operation selected.");
        return;
    }
    
    if (resDen === 0) {
        // This case should ideally be caught earlier, e.g. division by zero fraction,
        // but as a safeguard if resDen becomes zero through other means (e.g. n2=0 and d1=0 in mult)
        setError("Resulting denominator is zero, calculation undefined.");
        return;
    }


    // Simplify the result
    const commonDivisor = gcd(resNum, resDen);
    let simplifiedNum = resNum / commonDivisor;
    let simplifiedDen = resDen / commonDivisor;

    // Ensure denominator is positive
    if (simplifiedDen < 0) {
      simplifiedNum = -simplifiedNum;
      simplifiedDen = -simplifiedDen;
    }
    
    const simplifiedStr = `${simplifiedNum} / ${simplifiedDen}`;
    const decimalStr = (simplifiedNum / simplifiedDen).toFixed(5); // 5 decimal places

    let mixedStr: string | undefined = undefined;
    if (Math.abs(simplifiedNum) >= simplifiedDen && simplifiedDen !== 0) {
      const wholePart = Math.trunc(simplifiedNum / simplifiedDen);
      const remainderNum = Math.abs(simplifiedNum % simplifiedDen);
      if (remainderNum !== 0) {
        mixedStr = `${wholePart} ${remainderNum}/${simplifiedDen}`;
      } else {
        mixedStr = `${wholePart}`; // If it's a whole number
      }
    }

    setResult({
      simplified: simplifiedStr,
      mixed: mixedStr,
      decimal: decimalStr,
    });
  };

  const handleClear = () => {
    setNum1("");
    setDen1("");
    setNum2("");
    setDen2("");
    setOperation("+");
    setResult(null);
    setError(null);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr_auto_1fr] gap-4 items-end">
        {/* Fraction 1 */}
        <div className="flex flex-col items-center space-y-1">
          <Label htmlFor="num1" className="sr-only">Numerator 1</Label>
          <Input
            id="num1"
            type="number"
            placeholder="Num 1"
            value={num1}
            onChange={handleInputChange(setNum1)}
            aria-label="Numerator of first fraction"
            className="text-center"
          />
          <div className="h-px w-12 bg-foreground my-1"></div>
          <Label htmlFor="den1" className="sr-only">Denominator 1</Label>
          <Input
            id="den1"
            type="number"
            placeholder="Den 1"
            value={den1}
            onChange={handleInputChange(setDen1)}
            aria-label="Denominator of first fraction"
            className="text-center"
          />
        </div>

        {/* Operation Selector */}
        <div className="flex flex-col items-center justify-center h-full">
            <Label htmlFor="operation" className="sr-only">Operation</Label>
            <Select value={operation} onValueChange={(val) => setOperation(val as Operation)}>
            <SelectTrigger id="operation" className="w-[60px] sm:w-[80px] px-2 sm:px-3 py-2 text-xl" aria-label="Select operation">
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="+">+</SelectItem>
                <SelectItem value="-">-</SelectItem>
                <SelectItem value="*">*</SelectItem>
                <SelectItem value="/">/</SelectItem>
            </SelectContent>
            </Select>
        </div>
        

        {/* Fraction 2 */}
        <div className="flex flex-col items-center space-y-1">
          <Label htmlFor="num2" className="sr-only">Numerator 2</Label>
          <Input
            id="num2"
            type="number"
            placeholder="Num 2"
            value={num2}
            onChange={handleInputChange(setNum2)}
            aria-label="Numerator of second fraction"
            className="text-center"
          />
           <div className="h-px w-12 bg-foreground my-1"></div>
          <Label htmlFor="den2" className="sr-only">Denominator 2</Label>
          <Input
            id="den2"
            type="number"
            placeholder="Den 2"
            value={den2}
            onChange={handleInputChange(setDen2)}
            aria-label="Denominator of second fraction"
            className="text-center"
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <Button onClick={handleCalculate} className="w-full sm:w-auto flex-grow">
          <CalculatorIcon className="mr-2 h-4 w-4" /> Calculate
        </Button>
        <Button onClick={handleClear} variant="outline" className="w-full sm:w-auto">
          Clear All
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

      {result && (
        <Card className="bg-accent/10 border-accent/50">
          <CardHeader className="py-3 px-4">
            <CardTitle className="flex items-center text-primary text-base">
              <CalculatorIcon className="mr-2 h-5 w-5" /> Result
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-2">
            <p className="text-lg font-semibold">
              Simplified: <span className="font-mono text-primary">{result.simplified}</span>
            </p>
            {result.mixed && (
              <p className="text-md">
                Mixed Number: <span className="font-mono text-foreground/80">{result.mixed}</span>
              </p>
            )}
            <p className="text-md">
              Decimal: <span className="font-mono text-foreground/80">{result.decimal}</span>
            </p>
          </CardContent>
        </Card>
      )}
       <Card className="bg-muted/30 mt-6">
        <CardHeader className="py-2 px-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">How to use:</CardTitle>
        </CardHeader>
        <CardContent className="text-sm py-2 px-3 text-muted-foreground">
            <p>Enter the numerator and denominator for each fraction. Select the desired operation (+, -, *, /) and click 'Calculate'. The result will be shown in simplified form, as a mixed number (if applicable), and as a decimal.</p>
        </CardContent>
      </Card>
    </div>
  );
}
