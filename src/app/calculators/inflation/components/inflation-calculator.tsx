
"use client";

import { useState, type ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Calculator, Eraser, DollarSign, Percent as PercentIcon, CalendarDays } from "lucide-react";

export function InflationCalculator() {
  const [initialAmount, setInitialAmount] = useState<string>("");
  const [startYear, setStartYear] = useState<string>("");
  const [endYear, setEndYear] = useState<string>("");
  const [annualInflationRate, setAnnualInflationRate] = useState<string>("");

  const [adjustedAmount, setAdjustedAmount] = useState<string | null>(null);
  const [totalInflation, setTotalInflation] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
      setError(null);
      setAdjustedAmount(null);
      setTotalInflation(null);
    };

  const formatCurrency = (value: number): string => {
    return value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };
  
  const formatPercentage = (value: number): string => {
    return value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  const handleCalculate = () => {
    setError(null);
    setAdjustedAmount(null);
    setTotalInflation(null);

    const p = parseFloat(initialAmount);
    const sYear = parseInt(startYear, 10);
    const eYear = parseInt(endYear, 10);
    const rAnnual = parseFloat(annualInflationRate);

    if (isNaN(p) || p < 0) {
      setError("Please enter a valid initial amount (must be 0 or greater).");
      return;
    }
    if (isNaN(sYear) || !Number.isInteger(sYear)) {
      setError("Please enter a valid integer for the start year.");
      return;
    }
    if (isNaN(eYear) || !Number.isInteger(eYear)) {
      setError("Please enter a valid integer for the end year.");
      return;
    }
    if (isNaN(rAnnual)) {
      setError("Please enter a valid annual inflation rate.");
      return;
    }
    if (eYear < sYear) {
      setError("End year cannot be earlier than the start year.");
      return;
    }

    const numberOfYears = eYear - sYear;
    const rate = rAnnual / 100;

    const calculatedAdjustedAmount = p * Math.pow(1 + rate, numberOfYears);

    if (!isFinite(calculatedAdjustedAmount) || isNaN(calculatedAdjustedAmount)) {
      setError("Could not calculate adjusted amount. Please check inputs (e.g., values might be too large or lead to an undefined result).");
      return;
    }
    
    const calculatedTotalInflation = ((calculatedAdjustedAmount - p) / p) * 100;

    setAdjustedAmount(formatCurrency(calculatedAdjustedAmount));
    setTotalInflation(formatPercentage(isFinite(calculatedTotalInflation) && p > 0 ? calculatedTotalInflation : 0));
  };

  const handleClear = () => {
    setInitialAmount("");
    setStartYear("");
    setEndYear("");
    setAnnualInflationRate("");
    setAdjustedAmount(null);
    setTotalInflation(null);
    setError(null);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="initialAmount" className="flex items-center">
            <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
            Initial Amount
          </Label>
          <Input
            id="initialAmount" type="number" step="any" placeholder="e.g., 1000"
            value={initialAmount} onChange={handleInputChange(setInitialAmount)}
            aria-label="Initial Amount"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="annualInflationRate" className="flex items-center">
            <PercentIcon className="mr-2 h-4 w-4 text-muted-foreground" />
            Avg. Annual Inflation Rate (%)
          </Label>
          <Input
            id="annualInflationRate" type="number" step="any" placeholder="e.g., 3.5"
            value={annualInflationRate} onChange={handleInputChange(setAnnualInflationRate)}
            aria-label="Average Annual Inflation Rate in percent"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="startYear" className="flex items-center">
            <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />
            Start Year
          </Label>
          <Input
            id="startYear" type="number" placeholder="e.g., 2000"
            value={startYear} onChange={handleInputChange(setStartYear)}
            aria-label="Start Year"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="endYear" className="flex items-center">
            <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />
            End Year
          </Label>
          <Input
            id="endYear" type="number" placeholder="e.g., 2024"
            value={endYear} onChange={handleInputChange(setEndYear)}
            aria-label="End Year"
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <Button onClick={handleCalculate} className="w-full sm:w-auto flex-grow">
          <Calculator className="mr-2 h-4 w-4" /> Calculate Inflated Value
        </Button>
        <Button onClick={handleClear} variant="outline" className="w-full sm:w-auto">
          <Eraser className="mr-2 h-4 w-4" /> Clear
        </Button>
      </div>

      {error && (
        <Card className="bg-destructive/10 border-destructive/50">
          <CardHeader className="py-2 px-3"><CardTitle className="flex items-center text-destructive text-sm"><AlertCircle className="mr-2 h-4 w-4" />Error</CardTitle></CardHeader>
          <CardContent className="py-2 px-3"><p className="text-destructive text-sm">{error}</p></CardContent>
        </Card>
      )}

      {adjustedAmount !== null && totalInflation !== null && (
        <Card className="bg-accent/10 border-accent/50">
          <CardHeader className="py-3 px-4"><CardTitle className="flex items-center text-primary text-base"><Calculator className="mr-2 h-5 w-5" />Inflation Impact</CardTitle></CardHeader>
          <CardContent className="p-4 space-y-3">
            <div className="flex justify-between items-center">
              <p className="text-md text-foreground">Adjusted Amount in {endYear || "End Year"}:</p>
              <p className="text-xl font-semibold text-primary">{adjustedAmount}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-md text-foreground">Total Inflation over the period:</p>
              <p className="text-lg font-medium text-primary/90">{totalInflation}%</p>
            </div>
          </CardContent>
        </Card>
      )}
      <Card className="bg-muted/30 mt-6">
        <CardHeader className="py-2 px-3"><CardTitle className="text-sm font-medium text-muted-foreground">How to use:</CardTitle></CardHeader>
        <CardContent className="text-sm py-2 px-3 text-muted-foreground space-y-1">
            <p>Enter the initial amount, the start year, the end year, and the average annual inflation rate (as a percentage). Click 'Calculate Inflated Value' to see what the initial amount would be worth in the end year, considering the specified inflation.</p>
        </CardContent>
      </Card>
    </div>
  );
}
