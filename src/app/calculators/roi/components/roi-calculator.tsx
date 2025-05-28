
"use client";

import { useState, type ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Calculator, Eraser, DollarSign, TrendingUp } from "lucide-react";

export function RoiCalculator() {
  const [initialInvestment, setInitialInvestment] = useState<string>("");
  const [finalValue, setFinalValue] = useState<string>("");

  const [netProfit, setNetProfit] = useState<string | null>(null);
  const [roiPercentage, setRoiPercentage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
      setError(null);
      // Clear results on input change
      setNetProfit(null);
      setRoiPercentage(null);
    };

  const formatCurrency = (value: number): string => {
    return value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };
  
  const formatPercentage = (value: number): string => {
    return value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  const handleCalculate = () => {
    setError(null);
    setNetProfit(null);
    setRoiPercentage(null);

    const initial = parseFloat(initialInvestment);
    const final = parseFloat(finalValue);

    if (isNaN(initial)) {
      setError("Please enter a valid Initial Investment Amount.");
      return;
    }
    if (isNaN(final)) {
      setError("Please enter a valid Final Value of Investment.");
      return;
    }
    if (initial === 0) {
      setError("Initial Investment Amount cannot be zero for ROI calculation.");
      return;
    }
    if (initial < 0) {
        setError("Initial Investment Amount cannot be negative.");
        return;
    }


    const calculatedNetProfit = final - initial;
    const calculatedRoi = (calculatedNetProfit / initial) * 100;

    if (!isFinite(calculatedRoi) || isNaN(calculatedRoi)) {
      setError("Could not calculate ROI. Please check inputs (e.g., Initial Investment should not be zero).");
      return;
    }

    setNetProfit(formatCurrency(calculatedNetProfit));
    setRoiPercentage(formatPercentage(calculatedRoi));
  };

  const handleClear = () => {
    setInitialInvestment("");
    setFinalValue("");
    setNetProfit(null);
    setRoiPercentage(null);
    setError(null);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="initialInvestment" className="flex items-center">
            <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
            Initial Investment Amount
          </Label>
          <Input
            id="initialInvestment" type="number" step="any" placeholder="e.g., 10000"
            value={initialInvestment} onChange={handleInputChange(setInitialInvestment)}
            aria-label="Initial Investment Amount"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="finalValue" className="flex items-center">
            <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
            Final Value of Investment
          </Label>
          <Input
            id="finalValue" type="number" step="any" placeholder="e.g., 12000"
            value={finalValue} onChange={handleInputChange(setFinalValue)}
            aria-label="Final Value of Investment"
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <Button onClick={handleCalculate} className="w-full sm:w-auto flex-grow">
          <Calculator className="mr-2 h-4 w-4" /> Calculate ROI
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

      {netProfit !== null && roiPercentage !== null && (
        <Card className="bg-accent/10 border-accent/50">
          <CardHeader className="py-3 px-4"><CardTitle className="flex items-center text-primary text-base"><TrendingUp className="mr-2 h-5 w-5" />Investment Performance</CardTitle></CardHeader>
          <CardContent className="p-4 space-y-3">
            <div className="flex justify-between items-center">
              <p className="text-md text-foreground">Net Profit / Loss:</p>
              <p className={`text-xl font-semibold ${parseFloat(netProfit.replace(/,/g, '')) >= 0 ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}>
                {netProfit}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-md text-foreground">Return on Investment (ROI):</p>
               <p className={`text-xl font-semibold ${parseFloat(roiPercentage.replace(/,/g, '')) >= 0 ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}>
                {roiPercentage}%
              </p>
            </div>
          </CardContent>
        </Card>
      )}
       <Card className="bg-muted/30 mt-6">
        <CardHeader className="py-2 px-3"><CardTitle className="text-sm font-medium text-muted-foreground">How to use:</CardTitle></CardHeader>
        <CardContent className="text-sm py-2 px-3 text-muted-foreground space-y-1">
            <p>Enter the total amount you initially invested and the final value of that investment (e.g., its current market value or the amount it was sold for). Click 'Calculate ROI' to see your net profit or loss and your Return on Investment percentage.</p>
        </CardContent>
      </Card>
    </div>
  );
}
