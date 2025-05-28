
"use client";

import { useState, useEffect, type ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, DollarSign, Users, Percent, Eraser } from "lucide-react";

const tipPercentages = [10, 15, 18, 20, 25];

export function TipCalculator() {
  const [billAmount, setBillAmount] = useState<string>("");
  const [selectedTip, setSelectedTip] = useState<number | null>(15);
  const [customTip, setCustomTip] = useState<string>("");
  const [numberOfPeople, setNumberOfPeople] = useState<string>("1");

  const [tipAmount, setTipAmount] = useState<string | null>(null);
  const [totalAmount, setTotalAmount] = useState<string | null>(null);
  const [perPersonAmount, setPerPersonAmount] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const bill = parseFloat(billAmount);
    const people = parseInt(numberOfPeople, 10);
    let tipPercent = selectedTip !== null ? selectedTip : parseFloat(customTip);

    if (customTip.trim() !== "" && selectedTip !== null) {
      // If custom tip is being typed, deselect preset tip
       // This logic is handled by onCustomTipChange for better UX
    } else if (customTip.trim() === "" && selectedTip === null) {
      tipPercent = 0; // No tip selected or entered
    }


    if (isNaN(bill) || bill < 0) {
      setError(billAmount.trim() !== "" ? "Bill amount must be a non-negative number." : null);
      setTipAmount(null);
      setTotalAmount(null);
      setPerPersonAmount(null);
      return;
    }

    if (isNaN(tipPercent) || tipPercent < 0) {
      setError(customTip.trim() !== "" ? "Tip percentage must be a non-negative number." : null);
      setTipAmount(null);
      setTotalAmount(null);
      setPerPersonAmount(null);
      return;
    }
    
    if (isNaN(people) || people <= 0 || !Number.isInteger(people)) {
      setError(numberOfPeople.trim() !== "" ? "Number of people must be a positive whole number." : null);
      setTipAmount(null);
      setTotalAmount(null);
      setPerPersonAmount(null);
      return;
    }
    
    setError(null);

    const calculatedTip = bill * (tipPercent / 100);
    const calculatedTotal = bill + calculatedTip;
    const calculatedPerPerson = calculatedTotal / people;

    if (!isFinite(calculatedTip) || !isFinite(calculatedTotal) || !isFinite(calculatedPerPerson)) {
        setError("Calculation resulted in an invalid number. Please check inputs.");
        setTipAmount(null);
        setTotalAmount(null);
        setPerPersonAmount(null);
        return;
    }

    setTipAmount(calculatedTip.toFixed(2));
    setTotalAmount(calculatedTotal.toFixed(2));
    setPerPersonAmount(calculatedPerPerson.toFixed(2));

  }, [billAmount, selectedTip, customTip, numberOfPeople]);

  const handleBillAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBillAmount(e.target.value);
  };

  const handleTipSelect = (percentage: number) => {
    setSelectedTip(percentage);
    setCustomTip(""); // Clear custom tip when preset is selected
  };

  const handleCustomTipChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCustomTip(e.target.value);
    setSelectedTip(null); // Deselect preset tip when custom is typed
  };

  const handleNumberOfPeopleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNumberOfPeople(e.target.value);
  };
  
  const handleReset = () => {
    setBillAmount("");
    setSelectedTip(15);
    setCustomTip("");
    setNumberOfPeople("1");
    setTipAmount(null);
    setTotalAmount(null);
    setPerPersonAmount(null);
    setError(null);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1.5">
        <Label htmlFor="billAmount" className="flex items-center">
          <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
          Bill Amount
        </Label>
        <Input
          id="billAmount"
          type="number"
          step="any"
          placeholder="0.00"
          value={billAmount}
          onChange={handleBillAmountChange}
          aria-label="Bill Amount"
        />
      </div>

      <div className="space-y-1.5">
        <Label className="flex items-center">
            <Percent className="mr-2 h-4 w-4 text-muted-foreground" />
            Select Tip %
        </Label>
        <div className="grid grid-cols-3 gap-2">
          {tipPercentages.map((perc) => (
            <Button
              key={perc}
              variant={selectedTip === perc ? "default" : "outline"}
              onClick={() => handleTipSelect(perc)}
              className="text-sm"
            >
              {perc}%
            </Button>
          ))}
          <Input
            type="number"
            step="any"
            placeholder="Custom"
            value={customTip}
            onChange={handleCustomTipChange}
            aria-label="Custom tip percentage"
            className={`text-sm h-10 ${selectedTip !== null && customTip === "" ? "border-input" : parseFloat(customTip) >=0 && customTip !== "" ? "border-primary ring-1 ring-primary" : "border-input"}`}
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="numberOfPeople" className="flex items-center">
          <Users className="mr-2 h-4 w-4 text-muted-foreground" />
          Number of People
        </Label>
        <Input
          id="numberOfPeople"
          type="number"
          min="1"
          step="1"
          placeholder="1"
          value={numberOfPeople}
          onChange={handleNumberOfPeopleChange}
          aria-label="Number of people to split the bill"
        />
      </div>
      
       <Button onClick={handleReset} variant="outline" className="w-full">
        <Eraser className="mr-2 h-4 w-4" /> Reset
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

      {tipAmount !== null && totalAmount !== null && perPersonAmount !== null && !error && (
        <Card className="bg-accent/10 border-accent/50">
          <CardHeader className="py-3 px-4">
            <CardTitle className="flex items-center text-primary text-base">
                Calculation Results
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            <div className="flex justify-between items-center">
              <p className="text-md text-foreground">Tip Amount:</p>
              <p className="text-lg font-medium text-primary/90">${tipAmount}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-md text-foreground">Total Amount:</p>
              <p className="text-lg font-medium text-primary/90">${totalAmount}</p>
            </div>
            {parseInt(numberOfPeople, 10) > 1 && (
                 <div className="flex justify-between items-center">
                    <p className="text-md text-foreground">Amount Per Person:</p>
                    <p className="text-xl font-semibold text-primary">${perPersonAmount}</p>
                 </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
