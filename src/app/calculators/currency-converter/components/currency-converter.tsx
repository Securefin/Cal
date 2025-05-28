
"use client";

import { useState, useEffect, type ChangeEvent } from "react";
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
import { AlertCircle, Eraser, Landmark, Repeat } from "lucide-react";

type CurrencyCode = "USD" | "EUR" | "GBP" | "JPY" | "INR";

interface Currency {
  code: CurrencyCode;
  name: string;
  symbol: string;
  rate: number; // Rate relative to USD
}

const currencies: Currency[] = [
  { code: "USD", name: "US Dollar", symbol: "$", rate: 1 },
  { code: "EUR", name: "Euro", symbol: "€", rate: 0.92 },
  { code: "GBP", name: "British Pound", symbol: "£", rate: 0.79 },
  { code: "JPY", name: "Japanese Yen", symbol: "¥", rate: 157.00 },
  { code: "INR", name: "Indian Rupee", symbol: "₹", rate: 83.30 },
];

// For direct lookup
const exchangeRates: Record<CurrencyCode, Currency> = currencies.reduce((acc, curr) => {
    acc[curr.code] = curr;
    return acc;
}, {} as Record<CurrencyCode, Currency>);


export function CurrencyConverter() {
  const [amount, setAmount] = useState<string>("1");
  const [fromCurrency, setFromCurrency] = useState<CurrencyCode>("USD");
  const [toCurrency, setToCurrency] = useState<CurrencyCode>("INR");
  const [result, setResult] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (amount.trim() === "") {
      setResult("");
      setError(null);
      return;
    }

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount)) {
      setError("Please enter a valid number for the amount.");
      setResult("");
      return;
    }
    if (numAmount < 0) {
      setError("Amount cannot be negative.");
      setResult("");
      return;
    }
    setError(null);

    const rateFrom = exchangeRates[fromCurrency]?.rate;
    const rateTo = exchangeRates[toCurrency]?.rate;

    if (!rateFrom || !rateTo) {
      setError("Selected currency data not found.");
      setResult("");
      return;
    }

    const amountInUSD = numAmount / rateFrom;
    const convertedAmount = amountInUSD * rateTo;
    
    if (!isFinite(convertedAmount)) {
        setError("Calculation resulted in an invalid number.");
        setResult("");
        return;
    }

    setResult(convertedAmount.toFixed(2));

  }, [amount, fromCurrency, toCurrency]);

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleFromCurrencyChange = (value: string) => {
    setFromCurrency(value as CurrencyCode);
  };

  const handleToCurrencyChange = (value: string) => {
    setToCurrency(value as CurrencyCode);
  };
  
  const handleSwapCurrencies = () => {
    const currentFrom = fromCurrency;
    const currentTo = toCurrency;
    setFromCurrency(currentTo);
    setToCurrency(currentFrom);
    // Optionally, swap amount and result if it makes sense for the flow
    // For now, just swapping units and letting useEffect recalculate.
  };

  const handleClear = () => {
    setAmount("1");
    setFromCurrency("USD");
    setToCurrency("INR");
    setResult("");
    setError(null);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 items-end">
        <div className="space-y-1.5">
          <Label htmlFor="amount">Amount</Label>
          <Input
            id="amount"
            type="number"
            step="any"
            placeholder="Enter amount"
            value={amount}
            onChange={handleAmountChange}
            aria-label="Amount to convert"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2">
            <div className="space-y-1.5 w-full">
            <Label htmlFor="fromCurrency">From Currency</Label>
            <Select value={fromCurrency} onValueChange={handleFromCurrencyChange}>
                <SelectTrigger id="fromCurrency" aria-label="Select from currency">
                <SelectValue />
                </SelectTrigger>
                <SelectContent>
                {currencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>{currency.name} ({currency.code})</SelectItem>
                ))}
                </SelectContent>
            </Select>
            </div>

            <Button variant="outline" size="icon" onClick={handleSwapCurrencies} className="mt-4 sm:mt-6" aria-label="Swap currencies">
                <Repeat className="h-4 w-4" />
            </Button>

            <div className="space-y-1.5 w-full">
            <Label htmlFor="toCurrency">To Currency</Label>
            <Select value={toCurrency} onValueChange={handleToCurrencyChange}>
                <SelectTrigger id="toCurrency" aria-label="Select to currency">
                <SelectValue />
                </SelectTrigger>
                <SelectContent>
                {currencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>{currency.name} ({currency.code})</SelectItem>
                ))}
                </SelectContent>
            </Select>
            </div>
        </div>
      </div>
      
      <Button onClick={handleClear} variant="outline" className="w-full">
        <Eraser className="mr-2 h-4 w-4" /> Clear
      </Button>

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

      {result && !error && (
        <Card className="bg-accent/10 border-accent/50">
          <CardHeader className="py-3 px-4">
            <CardTitle className="flex items-center text-primary text-base">
                Converted Amount
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-2xl font-semibold text-primary break-all">
              {exchangeRates[toCurrency]?.symbol}{result}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {exchangeRates[fromCurrency]?.symbol}{amount} ({fromCurrency}) = {exchangeRates[toCurrency]?.symbol}{result} ({toCurrency})
            </p>
             <p className="text-xs text-destructive/80 dark:text-destructive/70 mt-2 font-medium">
                Note: Uses fixed sample exchange rates. Not for real financial transactions.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
