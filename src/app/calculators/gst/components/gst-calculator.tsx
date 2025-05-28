
"use client";

import { useState, type ChangeEvent, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Calculator, Eraser, DollarSign, Percent as PercentIcon } from "lucide-react";

type CalculationMode = "add" | "remove";

export function GstCalculator() {
  const [amount, setAmount] = useState<string>("");
  const [gstRate, setGstRate] = useState<string>("");
  const [calculationMode, setCalculationMode] = useState<CalculationMode>("add");

  const [gstAmount, setGstAmount] = useState<string | null>(null);
  const [netAmount, setNetAmount] = useState<string | null>(null);
  const [grossAmount, setGrossAmount] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const amountLabel = calculationMode === "add" ? "Original Amount (Excl. GST)" : "Gross Amount (Incl. GST)";

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
      setError(null);
      // Clear results on input change
      setGstAmount(null);
      setNetAmount(null);
      setGrossAmount(null);
    };

  const handleModeChange = (value: string) => {
    setCalculationMode(value as CalculationMode);
    setError(null);
    // Clear results when mode changes
    setGstAmount(null);
    setNetAmount(null);
    setGrossAmount(null);
    setAmount(""); // Also clear amount as its meaning changes
  };

  const formatCurrency = (value: number): string => {
    return value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const handleCalculate = () => {
    setError(null);
    setGstAmount(null);
    setNetAmount(null);
    setGrossAmount(null);

    const numAmount = parseFloat(amount);
    const numGstRate = parseFloat(gstRate);

    if (isNaN(numAmount) || numAmount < 0) {
      setError(`Please enter a valid ${amountLabel} (must be 0 or greater).`);
      return;
    }
    if (isNaN(numGstRate) || numGstRate < 0) {
      setError("Please enter a valid GST rate (must be 0 or greater).");
      return;
    }

    let calculatedGst: number;
    let calculatedNet: number;
    let calculatedGross: number;

    if (calculationMode === "add") {
      calculatedNet = numAmount;
      calculatedGst = (numAmount * numGstRate) / 100;
      calculatedGross = numAmount + calculatedGst;
    } else { // calculationMode === "remove"
      calculatedGross = numAmount;
      calculatedNet = numAmount / (1 + (numGstRate / 100));
      calculatedGst = calculatedGross - calculatedNet;
    }

    if (!isFinite(calculatedGst) || !isFinite(calculatedNet) || !isFinite(calculatedGross)) {
        setError("Calculation resulted in an invalid number. Please check inputs.");
        return;
    }

    setGstAmount(formatCurrency(calculatedGst));
    setNetAmount(formatCurrency(calculatedNet));
    setGrossAmount(formatCurrency(calculatedGross));
  };

  const handleClear = () => {
    setAmount("");
    setGstRate("");
    // calculationMode remains as is
    setGstAmount(null);
    setNetAmount(null);
    setGrossAmount(null);
    setError(null);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1.5">
        <Label>Calculation Type</Label>
        <RadioGroup
          value={calculationMode}
          onValueChange={handleModeChange}
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="add" id="addGst" />
            <Label htmlFor="addGst" className="font-normal">Add GST</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="remove" id="removeGst" />
            <Label htmlFor="removeGst" className="font-normal">Remove GST</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="amount" className="flex items-center">
            <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
            {amountLabel}
          </Label>
          <Input
            id="amount" type="number" step="any" placeholder="e.g., 1000"
            value={amount} onChange={handleInputChange(setAmount)}
            aria-label={amountLabel}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="gstRate" className="flex items-center">
            <PercentIcon className="mr-2 h-4 w-4 text-muted-foreground" />
            GST Rate (%)
          </Label>
          <Input
            id="gstRate" type="number" step="any" placeholder="e.g., 18"
            value={gstRate} onChange={handleInputChange(setGstRate)}
            aria-label="GST Rate in percent"
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <Button onClick={handleCalculate} className="w-full sm:w-auto flex-grow">
          <Calculator className="mr-2 h-4 w-4" /> Calculate GST
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

      {netAmount !== null && gstAmount !== null && grossAmount !== null && (
        <Card className="bg-accent/10 border-accent/50">
          <CardHeader className="py-3 px-4"><CardTitle className="flex items-center text-primary text-base"><Calculator className="mr-2 h-5 w-5" />GST Calculation Details</CardTitle></CardHeader>
          <CardContent className="p-4 space-y-3">
            <div className="flex justify-between items-center">
              <p className="text-md text-foreground">Net Amount (Excl. GST):</p>
              <p className="text-lg font-medium text-primary/90">{netAmount}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-md text-foreground">GST Amount:</p>
              <p className="text-lg font-medium text-primary/90">{gstAmount}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-md text-foreground">Gross Amount (Incl. GST):</p>
              <p className="text-xl font-semibold text-primary">{grossAmount}</p>
            </div>
          </CardContent>
        </Card>
      )}
       <Card className="bg-muted/30 mt-6">
        <CardHeader className="py-2 px-3"><CardTitle className="text-sm font-medium text-muted-foreground">How to use:</CardTitle></CardHeader>
        <CardContent className="text-sm py-2 px-3 text-muted-foreground space-y-1">
            <p><strong>Add GST:</strong> Enter the original amount (before GST) and the GST rate. The calculator will show the GST amount and the total amount (including GST).</p>
            <p><strong>Remove GST:</strong> Enter the gross amount (including GST) and the GST rate. The calculator will show the GST amount and the net amount (before GST).</p>
        </CardContent>
      </Card>
    </div>
  );
}
