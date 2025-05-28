
"use client";

import { useState, type ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Calculator, Eraser, DollarSign, Percent as PercentIcon, PlusCircle, Trash2, LineChart } from "lucide-react";

interface CashFlowItem {
  id: string;
  value: string;
}

export function NpvCalculator() {
  const [discountRate, setDiscountRate] = useState<string>("");
  const [initialInvestment, setInitialInvestment] = useState<string>("");
  const [cashFlows, setCashFlows] = useState<CashFlowItem[]>([{ id: Date.now().toString(), value: "" }]);
  
  const [npvResult, setNpvResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
      setError(null);
      setNpvResult(null);
    };

  const handleCashFlowChange = (id: string, value: string) => {
    setCashFlows(cashFlows.map(cf => cf.id === id ? { ...cf, value } : cf));
    setError(null);
    setNpvResult(null);
  };

  const addCashFlow = () => {
    setCashFlows([...cashFlows, { id: Date.now().toString(), value: "" }]);
    setError(null);
    setNpvResult(null);
  };

  const removeCashFlow = (id: string) => {
    if (cashFlows.length > 1) { // Ensure at least one cash flow input remains
      setCashFlows(cashFlows.filter(cf => cf.id !== id));
      setError(null);
      setNpvResult(null);
    }
  };

  const formatCurrency = (value: number): string => {
    return value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const handleCalculate = () => {
    setError(null);
    setNpvResult(null);

    const rAnnual = parseFloat(discountRate);
    const c0 = parseFloat(initialInvestment);

    if (isNaN(rAnnual) || rAnnual < 0) {
      setError("Please enter a valid annual discount rate (0 or greater).");
      return;
    }
    if (isNaN(c0) || c0 < 0) {
      setError("Please enter a valid initial investment amount (0 or greater).");
      return;
    }

    const r = rAnnual / 100;
    let calculatedNpv = -c0; // Initial investment is an outflow

    for (let t = 0; t < cashFlows.length; t++) {
      const cfValueStr = cashFlows[t].value;
      if (cfValueStr.trim() === "") { // Treat empty string as zero cash flow for that period
        // No operation needed as 0 / anything is 0 (unless Math.pow(1+r, t+1) is 0, which is not the case here)
        continue;
      }
      const cfValue = parseFloat(cfValueStr);
      if (isNaN(cfValue)) {
        setError(`Please enter a valid numeric value for Cash Flow Year ${t + 1}.`);
        return;
      }
      calculatedNpv += cfValue / Math.pow(1 + r, t + 1);
    }
    
    if (!isFinite(calculatedNpv)) {
        setError("Could not calculate NPV. Check inputs, especially if discount rate is -100% (-1 as decimal).");
        return;
    }

    setNpvResult(formatCurrency(calculatedNpv));
  };

  const handleClear = () => {
    setDiscountRate("");
    setInitialInvestment("");
    setCashFlows([{ id: Date.now().toString(), value: "" }]);
    setNpvResult(null);
    setError(null);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="initialInvestment" className="flex items-center">
            <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
            Initial Investment (C0)
          </Label>
          <Input
            id="initialInvestment" type="number" step="any" placeholder="e.g., 10000"
            value={initialInvestment} onChange={handleInputChange(setInitialInvestment)}
            aria-label="Initial Investment Amount"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="discountRate" className="flex items-center">
            <PercentIcon className="mr-2 h-4 w-4 text-muted-foreground" />
            Annual Discount Rate (%)
          </Label>
          <Input
            id="discountRate" type="number" step="any" placeholder="e.g., 10"
            value={discountRate} onChange={handleInputChange(setDiscountRate)}
            aria-label="Annual Discount Rate in percent"
          />
        </div>
      </div>

      <div className="space-y-3">
        <Label className="flex items-center font-medium">Future Cash Flows (CFt)</Label>
        {cashFlows.map((cf, index) => (
          <div key={cf.id} className="flex items-center gap-2">
            <Label htmlFor={`cf-${cf.id}`} className="min-w-[60px] text-sm text-muted-foreground">Year {index + 1}:</Label>
            <Input
              id={`cf-${cf.id}`}
              type="number"
              step="any"
              placeholder="e.g., 3000"
              value={cf.value}
              onChange={(e) => handleCashFlowChange(cf.id, e.target.value)}
              aria-label={`Cash flow for year ${index + 1}`}
              className="flex-grow"
            />
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => removeCashFlow(cf.id)} 
              disabled={cashFlows.length <= 1}
              aria-label={`Remove cash flow for year ${index + 1}`}
              className="shrink-0"
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        ))}
        <Button variant="outline" onClick={addCashFlow} className="w-full sm:w-auto mt-2">
          <PlusCircle className="mr-2 h-4 w-4" /> Add Cash Flow Year
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <Button onClick={handleCalculate} className="w-full sm:w-auto flex-grow">
          <Calculator className="mr-2 h-4 w-4" /> Calculate NPV
        </Button>
        <Button onClick={handleClear} variant="outline" className="w-full sm:w-auto">
          <Eraser className="mr-2 h-4 w-4" /> Clear All
        </Button>
      </div>

      {error && (
        <Card className="bg-destructive/10 border-destructive/50">
          <CardHeader className="py-2 px-3"><CardTitle className="flex items-center text-destructive text-sm"><AlertCircle className="mr-2 h-4 w-4" />Error</CardTitle></CardHeader>
          <CardContent className="py-2 px-3"><p className="text-destructive text-sm">{error}</p></CardContent>
        </Card>
      )}

      {npvResult !== null && (
        <Card className="bg-accent/10 border-accent/50">
          <CardHeader className="py-3 px-4"><CardTitle className="flex items-center text-primary text-base"><LineChart className="mr-2 h-5 w-5" />Net Present Value (NPV)</CardTitle></CardHeader>
          <CardContent className="p-4">
            <p className="text-2xl font-semibold text-primary">{npvResult}</p>
            <p className="text-xs text-muted-foreground mt-1">
              If NPV is positive, the investment may be profitable. If negative, it may result in a net loss.
            </p>
          </CardContent>
        </Card>
      )}
       <Card className="bg-muted/30 mt-6">
        <CardHeader className="py-2 px-3"><CardTitle className="text-sm font-medium text-muted-foreground">How to use:</CardTitle></CardHeader>
        <CardContent className="text-sm py-2 px-3 text-muted-foreground space-y-1">
            <p>Enter the initial investment (as a positive number), the annual discount rate, and the expected cash flows for each subsequent year. Add or remove cash flow years as needed. Click 'Calculate NPV' to see the result.</p>
            <p>Cash flows can be positive (inflows) or negative (outflows).</p>
        </CardContent>
      </Card>
    </div>
  );
}
