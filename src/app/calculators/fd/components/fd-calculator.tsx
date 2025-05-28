
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
import { AlertCircle, Calculator, Eraser, DollarSign, Percent as PercentIcon, CalendarDays, Info } from "lucide-react";

type CompoundingFrequency = "monthly" | "quarterly" | "half-yearly" | "annually";

export function FdCalculator() {
  const [principal, setPrincipal] = useState<string>("");
  const [annualRate, setAnnualRate] = useState<string>("");
  const [tenureYears, setTenureYears] = useState<string>("");
  const [tenureMonths, setTenureMonths] = useState<string>("");
  const [tenureDays, setTenureDays] = useState<string>("");
  const [compoundingFrequency, setCompoundingFrequency] = useState<CompoundingFrequency>("quarterly");

  const [maturityValue, setMaturityValue] = useState<string | null>(null);
  const [totalInterest, setTotalInterest] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
      setError(null);
      setMaturityValue(null);
      setTotalInterest(null);
    };
  
  const handleSelectChange = (value: string) => {
    setCompoundingFrequency(value as CompoundingFrequency);
    setError(null);
    setMaturityValue(null);
    setTotalInterest(null);
  }

  const formatCurrency = (value: number): string => {
    return value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const handleCalculate = () => {
    setError(null);
    setMaturityValue(null);
    setTotalInterest(null);

    const P = parseFloat(principal);
    const rAnnual = parseFloat(annualRate);
    const tY = parseInt(tenureYears, 10) || 0;
    const tM = parseInt(tenureMonths, 10) || 0;
    const tD = parseInt(tenureDays, 10) || 0;

    if (isNaN(P) || P <= 0) {
      setError("Please enter a valid principal amount greater than 0.");
      return;
    }
    if (isNaN(rAnnual) || rAnnual < 0) {
      setError("Please enter a valid annual interest rate (0 or greater).");
      return;
    }
    if (tY < 0 || tM < 0 || tD < 0 || !Number.isInteger(tY) || !Number.isInteger(tM) || !Number.isInteger(tD)) {
      setError("Please enter valid, non-negative integers for tenure (years, months, days).");
      return;
    }

    const totalDays = (tY * 365) + (tM * 30.4167) + tD; // Approximate days for months
    if (totalDays <= 0) {
        setError("Total tenure must be greater than 0 days.");
        return;
    }
    const tTotalYears = totalDays / 365;


    const r = rAnnual / 100; // Annual rate in decimal
    let n: number; // Compounding periods per year
    switch (compoundingFrequency) {
      case "monthly": n = 12; break;
      case "quarterly": n = 4; break;
      case "half-yearly": n = 2; break;
      case "annually": n = 1; break;
      default: setError("Invalid compounding frequency."); return;
    }

    // A = P * (1 + r/n)^(nt)
    const calculatedMaturityValue = P * Math.pow(1 + (r / n), n * tTotalYears);

    if (!isFinite(calculatedMaturityValue) || isNaN(calculatedMaturityValue)) {
      setError("Could not calculate maturity value. Please check inputs (e.g., tenure might be too short for selected compounding or values are too large).");
      return;
    }
    
    const calculatedTotalInterest = calculatedMaturityValue - P;

    setMaturityValue(formatCurrency(calculatedMaturityValue));
    setTotalInterest(formatCurrency(calculatedTotalInterest));
  };

  const handleClear = () => {
    setPrincipal("");
    setAnnualRate("");
    setTenureYears("");
    setTenureMonths("");
    setTenureDays("");
    setCompoundingFrequency("quarterly");
    setMaturityValue(null);
    setTotalInterest(null);
    setError(null);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="principal" className="flex items-center">
            <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
            Principal Amount
          </Label>
          <Input
            id="principal" type="number" step="any" placeholder="e.g., 100000"
            value={principal} onChange={handleInputChange(setPrincipal)}
            aria-label="Principal Amount"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="annualRate" className="flex items-center">
            <PercentIcon className="mr-2 h-4 w-4 text-muted-foreground" />
            Annual Interest Rate (%)
          </Label>
          <Input
            id="annualRate" type="number" step="any" placeholder="e.g., 6.5"
            value={annualRate} onChange={handleInputChange(setAnnualRate)}
            aria-label="Annual Interest Rate in percent"
          />
        </div>
        
        <div className="space-y-1.5">
          <Label className="flex items-center">
            <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />
            Investment Tenure
          </Label>
          <div className="grid grid-cols-3 gap-2">
            <Input id="tenureYears" type="number" placeholder="Years" value={tenureYears} onChange={handleInputChange(setTenureYears)} aria-label="Tenure in years" />
            <Input id="tenureMonths" type="number" placeholder="Months" value={tenureMonths} onChange={handleInputChange(setTenureMonths)} aria-label="Tenure in months" />
            <Input id="tenureDays" type="number" placeholder="Days" value={tenureDays} onChange={handleInputChange(setTenureDays)} aria-label="Tenure in days" />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="compoundingFrequency" className="flex items-center">
            <Info className="mr-2 h-4 w-4 text-muted-foreground" />
            Compounding Frequency
          </Label>
          <Select value={compoundingFrequency} onValueChange={handleSelectChange}>
            <SelectTrigger id="compoundingFrequency" aria-label="Select compounding frequency">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="annually">Annually</SelectItem>
              <SelectItem value="half-yearly">Half-Yearly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <Button onClick={handleCalculate} className="w-full sm:w-auto flex-grow">
          <Calculator className="mr-2 h-4 w-4" /> Calculate FD Value
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

      {maturityValue !== null && totalInterest !== null && (
        <Card className="bg-accent/10 border-accent/50">
          <CardHeader className="py-3 px-4"><CardTitle className="flex items-center text-primary text-base"><Calculator className="mr-2 h-5 w-5" />FD Details</CardTitle></CardHeader>
          <CardContent className="p-4 space-y-3">
            <div className="flex justify-between items-center">
              <p className="text-md text-foreground">Maturity Value:</p>
              <p className="text-xl font-semibold text-primary">{maturityValue}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-md text-foreground">Total Interest Earned:</p>
              <p className="text-lg font-medium text-primary/90">{totalInterest}</p>
            </div>
          </CardContent>
        </Card>
      )}
      <Card className="bg-muted/30 mt-6">
        <CardHeader className="py-2 px-3"><CardTitle className="text-sm font-medium text-muted-foreground">How to use:</CardTitle></CardHeader>
        <CardContent className="text-sm py-2 px-3 text-muted-foreground space-y-1">
            <p>Enter the principal amount, annual interest rate, investment tenure (in years, months, and days), and how often the interest is compounded. Click 'Calculate FD Value' to see the projected maturity amount and total interest earned.</p>
        </CardContent>
      </Card>
    </div>
  );
}
