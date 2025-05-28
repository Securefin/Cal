
"use client";

import { useState, type ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Calculator, Eraser, IndianRupee, Percent as PercentIcon, CalendarDays } from "lucide-react";

export function PpfCalculator() {
  const [yearlyInvestment, setYearlyInvestment] = useState<string>("");
  const [interestRate, setInterestRate] = useState<string>(""); // Annual interest rate
  const [duration, setDuration] = useState<string>("15"); // Duration in years, default 15 for PPF

  const [totalInvested, setTotalInvested] = useState<string | null>(null);
  const [totalInterest, setTotalInterest] = useState<string | null>(null);
  const [maturityValue, setMaturityValue] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
      setError(null);
      // Clear results on input change
      setTotalInvested(null);
      setTotalInterest(null);
      setMaturityValue(null);
    };

  const formatCurrency = (value: number): string => {
    return value.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const handleCalculate = () => {
    setError(null);
    setTotalInvested(null);
    setTotalInterest(null);
    setMaturityValue(null);

    const P = parseFloat(yearlyInvestment); // Yearly investment
    const r = parseFloat(interestRate) / 100; // Annual interest rate as a decimal
    const T = parseInt(duration, 10); // Duration in years

    if (isNaN(P) || P <= 0) {
      setError("Please enter a valid yearly investment amount greater than 0.");
      return;
    }
    if (isNaN(r) || r < 0) {
      setError("Please enter a valid annual interest rate (0 or greater).");
      return;
    }
    if (isNaN(T) || T <= 0 || !Number.isInteger(T)) {
      setError("Please enter a valid investment duration in whole years greater than 0.");
      return;
    }
     if (P < 500 || P > 150000) {
       // It's good to inform, but not strictly an error that stops calculation for a generic tool
       // setError("Note: PPF investment is typically between ₹500 and ₹1,50,000 per year.");
    }


    let currentBalance = 0;
    for (let year = 0; year < T; year++) {
      currentBalance += P; // Investment made at the start of the year (common assumption)
      currentBalance *= (1 + r); // Interest compounded annually
    }
    
    const calculatedMaturityValue = currentBalance;
    const calculatedTotalInvested = P * T;
    const calculatedTotalInterest = calculatedMaturityValue - calculatedTotalInvested;

    if (!isFinite(calculatedMaturityValue) || isNaN(calculatedMaturityValue)) {
        setError("Could not calculate maturity value. Please check your inputs, they might be too large or lead to an undefined result.");
        return;
    }

    setTotalInvested(formatCurrency(calculatedTotalInvested));
    setTotalInterest(formatCurrency(calculatedTotalInterest));
    setMaturityValue(formatCurrency(calculatedMaturityValue));
  };

  const handleClear = () => {
    setYearlyInvestment("");
    setInterestRate("");
    setDuration("15");
    setTotalInvested(null);
    setTotalInterest(null);
    setMaturityValue(null);
    setError(null);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="yearlyInvestment" className="flex items-center">
            <IndianRupee className="mr-2 h-4 w-4 text-muted-foreground" />
            Yearly Investment Amount (₹)
          </Label>
          <Input
            id="yearlyInvestment"
            type="number"
            step="any"
            placeholder="e.g., 50000 (Min: 500, Max: 1,50,000)"
            value={yearlyInvestment}
            onChange={handleInputChange(setYearlyInvestment)}
            aria-label="Yearly Investment Amount in Rupees"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="interestRate" className="flex items-center">
            <PercentIcon className="mr-2 h-4 w-4 text-muted-foreground" />
            Annual Interest Rate (%)
          </Label>
          <Input
            id="interestRate"
            type="number"
            step="any"
            placeholder="e.g., 7.1"
            value={interestRate}
            onChange={handleInputChange(setInterestRate)}
            aria-label="Annual Interest Rate in percent"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="duration" className="flex items-center">
            <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />
            Investment Duration (in years)
          </Label>
          <Input
            id="duration"
            type="number"
            step="1"
            placeholder="e.g., 15"
            value={duration}
            onChange={handleInputChange(setDuration)}
            aria-label="Investment Duration in years"
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <Button onClick={handleCalculate} className="w-full sm:w-auto flex-grow">
          <Calculator className="mr-2 h-4 w-4" /> Calculate PPF Value
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

      {maturityValue !== null && (
        <Card className="bg-accent/10 border-accent/50">
          <CardHeader className="py-3 px-4">
            <CardTitle className="flex items-center text-primary text-base">
              <Calculator className="mr-2 h-5 w-5" /> PPF Projection
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            <div className="flex justify-between items-center">
              <p className="text-md text-foreground">Total Amount Invested:</p>
              <p className="text-lg font-medium text-primary/90">₹{totalInvested}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-md text-foreground">Total Interest Earned:</p>
              <p className="text-lg font-medium text-primary/90">₹{totalInterest}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-md text-foreground">Maturity Value:</p>
              <p className="text-xl font-semibold text-primary">₹{maturityValue}</p>
            </div>
          </CardContent>
        </Card>
      )}
      <Card className="bg-muted/30 mt-6">
        <CardHeader className="py-2 px-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">How to use:</CardTitle>
        </CardHeader>
        <CardContent className="text-sm py-2 px-3 text-muted-foreground space-y-1">
            <p>Enter your yearly investment, the current PPF interest rate, and the desired investment duration in years.</p>
            <p>The calculator assumes the investment is made at the beginning of each financial year and interest is compounded annually.</p>
            <p className="text-xs">Note: PPF interest rates are set by the government and can change. Typical investment limits are ₹500 to ₹1,50,000 per year. The default tenure is 15 years, extendable in 5-year blocks.</p>
        </CardContent>
      </Card>
    </div>
  );
}
