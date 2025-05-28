
"use client";

import { useState, type ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Calculator, Eraser, DollarSign, Percent as PercentIcon, CalendarClock } from "lucide-react";

const MAX_MONTHS = 40 * 12; // Max 40 years to pay off

export function CreditCardPaymentCalculator() {
  const [balance, setBalance] = useState<string>("");
  const [apr, setApr] = useState<string>("");
  const [monthlyPayment, setMonthlyPayment] = useState<string>("");

  const [monthsToPayOff, setMonthsToPayOff] = useState<string | null>(null);
  const [totalInterestPaid, setTotalInterestPaid] = useState<string | null>(null);
  const [totalAmountPaid, setTotalAmountPaid] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
      setError(null);
      // Clear results on input change
      setMonthsToPayOff(null);
      setTotalInterestPaid(null);
      setTotalAmountPaid(null);
    };

  const formatCurrency = (value: number): string => {
    return value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const handleCalculate = () => {
    setError(null);
    setMonthsToPayOff(null);
    setTotalInterestPaid(null);
    setTotalAmountPaid(null);

    const p = parseFloat(balance); // Principal balance
    const annualRate = parseFloat(apr); // Annual Percentage Rate
    const M = parseFloat(monthlyPayment); // Monthly payment

    if (isNaN(p) || p <= 0) {
      setError("Please enter a valid outstanding balance greater than 0.");
      return;
    }
    if (isNaN(annualRate) || annualRate < 0) {
      setError("Please enter a valid Annual Percentage Rate (APR) (0 or greater).");
      return;
    }
    if (isNaN(M) || M <= 0) {
      setError("Please enter a valid monthly payment greater than 0.");
      return;
    }

    const monthlyRate = (annualRate / 100) / 12;
    
    // Check if payment is too low (less than or equal to first month's interest if rate > 0)
    if (monthlyRate > 0 && M <= p * monthlyRate) {
      setError("Your monthly payment is too low to cover the interest. The balance will not decrease. Please increase your payment.");
      return;
    }
     if (monthlyRate === 0 && M > 0) { // No interest, simple division
      const months = Math.ceil(p / M);
      setMonthsToPayOff(months.toString());
      setTotalInterestPaid(formatCurrency(0));
      setTotalAmountPaid(formatCurrency(p));
      return;
    }
    if (monthlyRate === 0 && M === 0) { // No interest, no payment
        setError("Monthly payment must be greater than 0.");
        return;
    }


    let currentBalance = p;
    let totalInterest = 0;
    let months = 0;

    while (currentBalance > 0 && months < MAX_MONTHS) {
      const interestForMonth = currentBalance * monthlyRate;
      totalInterest += interestForMonth;
      
      let principalPaidThisMonth = M - interestForMonth;
      
      // If payment is less than interest (should be caught above, but as a safeguard)
      if (principalPaidThisMonth <=0 && M > 0) { 
        setError("The monthly payment is not enough to cover the interest. The balance will increase.");
        setMonthsToPayOff(null);
        setTotalInterestPaid(null);
        setTotalAmountPaid(null);
        return;
      }

      currentBalance -= principalPaidThisMonth;
      months++;

      // If the last payment overshoots
      if (currentBalance < 0) {
          totalInterest -= (-currentBalance * monthlyRate); // Adjust interest for overpayment portion
          currentBalance = 0; // Balance is paid off
      }
    }
    
    if (months >= MAX_MONTHS && currentBalance > 0) {
        setError("With this monthly payment, it will take over 40 years to pay off the balance. Please consider increasing your payment.");
        return;
    }

    const finalTotalAmountPaid = p + totalInterest;

    setMonthsToPayOff(months.toString());
    setTotalInterestPaid(formatCurrency(totalInterest));
    setTotalAmountPaid(formatCurrency(finalTotalAmountPaid));
  };

  const handleClear = () => {
    setBalance("");
    setApr("");
    setMonthlyPayment("");
    setMonthsToPayOff(null);
    setTotalInterestPaid(null);
    setTotalAmountPaid(null);
    setError(null);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="balance" className="flex items-center">
            <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
            Outstanding Credit Card Balance
          </Label>
          <Input
            id="balance" type="number" step="any" placeholder="e.g., 5000"
            value={balance} onChange={handleInputChange(setBalance)}
            aria-label="Outstanding Credit Card Balance"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="apr" className="flex items-center">
            <PercentIcon className="mr-2 h-4 w-4 text-muted-foreground" />
            Annual Percentage Rate (APR) (%)
          </Label>
          <Input
            id="apr" type="number" step="any" placeholder="e.g., 18.9"
            value={apr} onChange={handleInputChange(setApr)}
            aria-label="Annual Percentage Rate (APR) in percent"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="monthlyPayment" className="flex items-center">
            <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
            Your Planned Monthly Payment
          </Label>
          <Input
            id="monthlyPayment" type="number" step="any" placeholder="e.g., 200"
            value={monthlyPayment} onChange={handleInputChange(setMonthlyPayment)}
            aria-label="Your Planned Monthly Payment"
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <Button onClick={handleCalculate} className="w-full sm:w-auto flex-grow">
          <Calculator className="mr-2 h-4 w-4" /> Calculate Payoff
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

      {monthsToPayOff !== null && totalInterestPaid !== null && totalAmountPaid !== null && (
        <Card className="bg-accent/10 border-accent/50">
          <CardHeader className="py-3 px-4"><CardTitle className="flex items-center text-primary text-base"><CalendarClock className="mr-2 h-5 w-5" />Payoff Projection</CardTitle></CardHeader>
          <CardContent className="p-4 space-y-3">
            <div className="flex justify-between items-center">
              <p className="text-md text-foreground">Months to Pay Off:</p>
              <p className="text-xl font-semibold text-primary">{monthsToPayOff}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-md text-foreground">Total Interest Paid:</p>
              <p className="text-lg font-medium text-primary/90">{totalInterestPaid}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-md text-foreground">Total Amount Paid:</p>
              <p className="text-lg font-medium text-primary/90">{totalAmountPaid}</p>
            </div>
          </CardContent>
        </Card>
      )}
       <Card className="bg-muted/30 mt-6">
        <CardHeader className="py-2 px-3"><CardTitle className="text-sm font-medium text-muted-foreground">How to use:</CardTitle></CardHeader>
        <CardContent className="text-sm py-2 px-3 text-muted-foreground space-y-1">
            <p>Enter your outstanding credit card balance, the Annual Percentage Rate (APR), and how much you plan to pay each month. The calculator will estimate the number of months it will take to clear your debt, the total interest you'll pay, and the total amount paid.</p>
        </CardContent>
      </Card>
    </div>
  );
}

