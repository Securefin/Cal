
"use client";

import { useState, type ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Calculator, Eraser, DollarSign, Percent as PercentIcon, CalendarDays } from "lucide-react";

export function LoanEmiCalculator() {
  const [principal, setPrincipal] = useState<string>("");
  const [annualRate, setAnnualRate] = useState<string>("");
  const [tenureYears, setTenureYears] = useState<string>("");

  const [emi, setEmi] = useState<string | null>(null);
  const [totalInterest, setTotalInterest] = useState<string | null>(null);
  const [totalPayment, setTotalPayment] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
      setError(null);
      setEmi(null);
      setTotalInterest(null);
      setTotalPayment(null);
    };

  const formatCurrency = (value: number): string => {
    return value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const handleCalculate = () => {
    setError(null);
    setEmi(null);
    setTotalInterest(null);
    setTotalPayment(null);

    const p = parseFloat(principal);
    const rAnnual = parseFloat(annualRate);
    const tYears = parseFloat(tenureYears);

    if (isNaN(p) || p <= 0) {
      setError("Please enter a valid loan amount greater than 0.");
      return;
    }
    if (isNaN(rAnnual) || rAnnual < 0) {
      setError("Please enter a valid annual interest rate (0 or greater).");
      return;
    }
    if (isNaN(tYears) || tYears <= 0) {
      setError("Please enter a valid loan tenure in years greater than 0.");
      return;
    }

    const monthlyRate = (rAnnual / 12) / 100;
    const tenureMonths = tYears * 12;

    if (tenureMonths === 0) {
        setError("Loan tenure in months cannot be zero.");
        return;
    }
    
    let calculatedEmi: number;
    if (monthlyRate === 0) { // Interest-free loan
        calculatedEmi = p / tenureMonths;
    } else {
        calculatedEmi = (p * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) / (Math.pow(1 + monthlyRate, tenureMonths) - 1);
    }


    if (!isFinite(calculatedEmi) || isNaN(calculatedEmi)) {
        setError("Could not calculate EMI. Please check your inputs. The values might be too large or lead to an undefined result.");
        return;
    }

    const calculatedTotalPayment = calculatedEmi * tenureMonths;
    const calculatedTotalInterest = calculatedTotalPayment - p;

    setEmi(formatCurrency(calculatedEmi));
    setTotalPayment(formatCurrency(calculatedTotalPayment));
    setTotalInterest(formatCurrency(calculatedTotalInterest));
  };

  const handleClear = () => {
    setPrincipal("");
    setAnnualRate("");
    setTenureYears("");
    setEmi(null);
    setTotalInterest(null);
    setTotalPayment(null);
    setError(null);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="principal" className="flex items-center">
            <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
            Loan Amount (Principal)
          </Label>
          <Input
            id="principal"
            type="number"
            step="any"
            placeholder="e.g., 100000"
            value={principal}
            onChange={handleInputChange(setPrincipal)}
            aria-label="Loan Amount (Principal)"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="annualRate" className="flex items-center">
            <PercentIcon className="mr-2 h-4 w-4 text-muted-foreground" />
            Annual Interest Rate (%)
          </Label>
          <Input
            id="annualRate"
            type="number"
            step="any"
            placeholder="e.g., 8.5"
            value={annualRate}
            onChange={handleInputChange(setAnnualRate)}
            aria-label="Annual Interest Rate in percent"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="tenureYears" className="flex items-center">
            <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />
            Loan Tenure (in years)
          </Label>
          <Input
            id="tenureYears"
            type="number"
            step="any"
            placeholder="e.g., 5 or 2.5"
            value={tenureYears}
            onChange={handleInputChange(setTenureYears)}
            aria-label="Loan Tenure in years"
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <Button onClick={handleCalculate} className="w-full sm:w-auto flex-grow">
          <Calculator className="mr-2 h-4 w-4" /> Calculate EMI
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

      {emi !== null && totalInterest !== null && totalPayment !== null && (
        <Card className="bg-accent/10 border-accent/50">
          <CardHeader className="py-3 px-4">
            <CardTitle className="flex items-center text-primary text-base">
              <Calculator className="mr-2 h-5 w-5" /> Loan EMI Details
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            <div className="flex justify-between items-center">
              <p className="text-md text-foreground">Monthly EMI:</p>
              <p className="text-xl font-semibold text-primary">{emi}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-md text-foreground">Total Interest Payable:</p>
              <p className="text-lg font-medium text-primary/90">{totalInterest}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-md text-foreground">Total Payment (Principal + Interest):</p>
              <p className="text-lg font-medium text-primary/90">{totalPayment}</p>
            </div>
          </CardContent>
        </Card>
      )}
      <Card className="bg-muted/30 mt-6">
        <CardHeader className="py-2 px-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">How to use:</CardTitle>
        </CardHeader>
        <CardContent className="text-sm py-2 px-3 text-muted-foreground">
            <p>Enter your total loan amount, the annual interest rate, and the loan duration in years. Click 'Calculate EMI' to see your monthly payment, total interest, and total amount payable.</p>
        </CardContent>
      </Card>
    </div>
  );
}

