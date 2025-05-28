
"use client";

import { useState, type ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Calculator, Eraser, DollarSign, Percent as PercentIcon, CalendarDays, TrendingUp } from "lucide-react";

export function SipCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useState<string>("");
  const [annualReturnRate, setAnnualReturnRate] = useState<string>("");
  const [investmentDuration, setInvestmentDuration] = useState<string>("");

  const [totalInvested, setTotalInvested] = useState<string | null>(null);
  const [estimatedReturns, setEstimatedReturns] = useState<string | null>(null);
  const [futureValue, setFutureValue] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
      setError(null);
      setTotalInvested(null);
      setEstimatedReturns(null);
      setFutureValue(null);
    };

  const formatCurrency = (value: number): string => {
    return value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const handleCalculate = () => {
    setError(null);
    setTotalInvested(null);
    setEstimatedReturns(null);
    setFutureValue(null);

    const P = parseFloat(monthlyInvestment); // Monthly investment
    const annualRate = parseFloat(annualReturnRate); // Annual return rate
    const T = parseFloat(investmentDuration); // Investment duration in years

    if (isNaN(P) || P <= 0) {
      setError("Please enter a valid monthly investment amount greater than 0.");
      return;
    }
    if (isNaN(annualRate) || annualRate < 0) {
      setError("Please enter a valid expected annual return rate (0 or greater).");
      return;
    }
    if (isNaN(T) || T <= 0) {
      setError("Please enter a valid investment duration in years greater than 0.");
      return;
    }

    const n = T * 12; // Number of months
    const i = (annualRate / 12) / 100; // Monthly interest rate

    let M: number; // Maturity value
    if (i === 0) { // If interest rate is 0
        M = P * n;
    } else {
        M = P * ((Math.pow(1 + i, n) - 1) / i);
    }
    

    if (!isFinite(M) || isNaN(M)) {
        setError("Could not calculate future value. Please check your inputs, they might be too large or lead to an undefined result.");
        return;
    }

    const calculatedTotalInvested = P * n;
    const calculatedEstimatedReturns = M - calculatedTotalInvested;

    setTotalInvested(formatCurrency(calculatedTotalInvested));
    setEstimatedReturns(formatCurrency(calculatedEstimatedReturns));
    setFutureValue(formatCurrency(M));
  };

  const handleClear = () => {
    setMonthlyInvestment("");
    setAnnualReturnRate("");
    setInvestmentDuration("");
    setTotalInvested(null);
    setEstimatedReturns(null);
    setFutureValue(null);
    setError(null);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="monthlyInvestment" className="flex items-center">
            <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
            Monthly Investment Amount
          </Label>
          <Input
            id="monthlyInvestment"
            type="number"
            step="any"
            placeholder="e.g., 5000"
            value={monthlyInvestment}
            onChange={handleInputChange(setMonthlyInvestment)}
            aria-label="Monthly Investment Amount"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="annualReturnRate" className="flex items-center">
            <PercentIcon className="mr-2 h-4 w-4 text-muted-foreground" />
            Expected Annual Return Rate (%)
          </Label>
          <Input
            id="annualReturnRate"
            type="number"
            step="any"
            placeholder="e.g., 12"
            value={annualReturnRate}
            onChange={handleInputChange(setAnnualReturnRate)}
            aria-label="Expected Annual Return Rate in percent"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="investmentDuration" className="flex items-center">
            <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />
            Investment Duration (in years)
          </Label>
          <Input
            id="investmentDuration"
            type="number"
            step="any"
            placeholder="e.g., 10 or 15.5"
            value={investmentDuration}
            onChange={handleInputChange(setInvestmentDuration)}
            aria-label="Investment Duration in years"
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <Button onClick={handleCalculate} className="w-full sm:w-auto flex-grow">
          <Calculator className="mr-2 h-4 w-4" /> Calculate SIP Value
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

      {futureValue !== null && (
        <Card className="bg-accent/10 border-accent/50">
          <CardHeader className="py-3 px-4">
            <CardTitle className="flex items-center text-primary text-base">
              <TrendingUp className="mr-2 h-5 w-5" /> SIP Investment Projection
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            <div className="flex justify-between items-center">
              <p className="text-md text-foreground">Total Amount Invested:</p>
              <p className="text-lg font-medium text-primary/90">{totalInvested}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-md text-foreground">Estimated Returns:</p>
              <p className="text-lg font-medium text-primary/90">{estimatedReturns}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-md text-foreground">Total Future Value:</p>
              <p className="text-xl font-semibold text-primary">{futureValue}</p>
            </div>
          </CardContent>
        </Card>
      )}
      <Card className="bg-muted/30 mt-6">
        <CardHeader className="py-2 px-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">How to use:</CardTitle>
        </CardHeader>
        <CardContent className="text-sm py-2 px-3 text-muted-foreground">
            <p>Enter your monthly investment amount, the expected annual rate of return, and the duration of your investment in years. Click 'Calculate SIP Value' to see your projected total investment, estimated returns, and the total future value.</p>
        </CardContent>
      </Card>
    </div>
  );
}
