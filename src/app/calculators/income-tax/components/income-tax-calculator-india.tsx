
"use client";

import { useState, type ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Calculator, Eraser, IndianRupee } from "lucide-react";

export function IncomeTaxCalculatorIndia() {
  const [taxableIncome, setTaxableIncome] = useState<string>("");
  
  const [incomeTax, setIncomeTax] = useState<string | null>(null);
  const [healthEduCess, setHealthEduCess] = useState<string | null>(null);
  const [totalTaxPayable, setTotalTaxPayable] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
      setError(null);
      // Clear results on input change
      setIncomeTax(null);
      setHealthEduCess(null);
      setTotalTaxPayable(null);
    };

  const formatCurrency = (value: number): string => {
    return value.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const calculateTaxNewRegime = (income: number): { tax: number; cess: number; total: number } => {
    let tax = 0;

    if (income <= 300000) {
      tax = 0;
    } else if (income <= 600000) {
      tax = (income - 300000) * 0.05;
    } else if (income <= 900000) {
      tax = 15000 + (income - 600000) * 0.10;
    } else if (income <= 1200000) {
      tax = 45000 + (income - 900000) * 0.15;
    } else if (income <= 1500000) {
      tax = 90000 + (income - 1200000) * 0.20;
    } else {
      tax = 150000 + (income - 1500000) * 0.30;
    }

    // Rebate under Section 87A for New Regime (AY 2025-26)
    // If taxable income is up to ₹7,00,000, tax payable is nil.
    // The actual rebate is lower of tax calculated or ₹25,000, but effectively results in zero tax up to ₹7L.
    if (income <= 700000) {
      tax = 0; 
    }
    
    const cess = tax * 0.04; // Health and Education Cess @ 4%
    const total = tax + cess;

    return { tax, cess, total };
  };

  const handleCalculate = () => {
    setError(null);
    setIncomeTax(null);
    setHealthEduCess(null);
    setTotalTaxPayable(null);

    const income = parseFloat(taxableIncome);

    if (isNaN(income) || income < 0) {
      setError("Please enter a valid Total Taxable Income (must be 0 or greater).");
      return;
    }

    const { tax, cess, total } = calculateTaxNewRegime(income);

    setIncomeTax(formatCurrency(tax));
    setHealthEduCess(formatCurrency(cess));
    setTotalTaxPayable(formatCurrency(total));
  };

  const handleClear = () => {
    setTaxableIncome("");
    setIncomeTax(null);
    setHealthEduCess(null);
    setTotalTaxPayable(null);
    setError(null);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="taxableIncome" className="flex items-center">
            <IndianRupee className="mr-2 h-4 w-4 text-muted-foreground" />
            Total Taxable Income (Annual)
          </Label>
          <Input
            id="taxableIncome"
            type="number"
            step="any"
            placeholder="e.g., 800000 (after standard deduction if applicable)"
            value={taxableIncome}
            onChange={handleInputChange(setTaxableIncome)}
            aria-label="Total Taxable Income (Annual) in Rupees"
          />
        </div>
        {/* Placeholder for Tax Regime selection if we add Old Regime later */}
        {/* 
        <div className="space-y-1.5">
          <Label htmlFor="taxRegime">Tax Regime</Label>
          <Select defaultValue="new">
            <SelectTrigger id="taxRegime"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="new">New Regime (Default for AY 2025-26)</SelectItem>
              <SelectItem value="old" disabled>Old Regime (Coming Soon)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        */}
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <Button onClick={handleCalculate} className="w-full sm:w-auto flex-grow">
          <Calculator className="mr-2 h-4 w-4" /> Calculate Income Tax
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

      {totalTaxPayable !== null && (
        <Card className="bg-accent/10 border-accent/50">
          <CardHeader className="py-3 px-4"><CardTitle className="flex items-center text-primary text-base"><IndianRupee className="mr-2 h-5 w-5" />Tax Calculation (New Regime)</CardTitle></CardHeader>
          <CardContent className="p-4 space-y-3">
            <div className="flex justify-between items-center">
              <p className="text-md text-foreground">Income Tax:</p>
              <p className="text-lg font-medium text-primary/90">₹{incomeTax}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-md text-foreground">Health & Education Cess (4%):</p>
              <p className="text-lg font-medium text-primary/90">₹{healthEduCess}</p>
            </div>
            <div className="flex justify-between items-center border-t pt-2 mt-2">
              <p className="text-md text-foreground font-semibold">Total Tax Payable:</p>
              <p className="text-xl font-semibold text-primary">₹{totalTaxPayable}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
