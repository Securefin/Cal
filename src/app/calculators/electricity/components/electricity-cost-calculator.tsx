
"use client";

import { useState, type ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Calculator, Eraser, Zap, Clock, DollarSign } from "lucide-react";

export function ElectricityCostCalculator() {
  const [powerWatts, setPowerWatts] = useState<string>("");
  const [hoursPerDay, setHoursPerDay] = useState<string>("");
  const [daysPerMonth, setDaysPerMonth] = useState<string>("30");
  const [costPerKwh, setCostPerKwh] = useState<string>("");

  const [monthlyConsumptionKwh, setMonthlyConsumptionKwh] = useState<string | null>(null);
  const [monthlyCost, setMonthlyCost] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
      setError(null);
      setMonthlyConsumptionKwh(null);
      setMonthlyCost(null);
    };

  const formatCurrency = (value: number): string => {
    return value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const formatNumber = (value: number, digits: number = 2): string => {
    return value.toLocaleString(undefined, { minimumFractionDigits: digits, maximumFractionDigits: digits });
  };

  const handleCalculate = () => {
    setError(null);
    setMonthlyConsumptionKwh(null);
    setMonthlyCost(null);

    const pWatts = parseFloat(powerWatts);
    const hpd = parseFloat(hoursPerDay);
    const dpm = parseInt(daysPerMonth, 10);
    const cpk = parseFloat(costPerKwh);

    if (isNaN(pWatts) || pWatts <= 0) {
      setError("Please enter a valid appliance power in Watts (>0).");
      return;
    }
    if (isNaN(hpd) || hpd < 0 || hpd > 24) {
      setError("Please enter valid hours used per day (0-24).");
      return;
    }
    if (isNaN(dpm) || dpm <= 0 || dpm > 31 || !Number.isInteger(dpm)) {
      setError("Please enter a valid number of days per month (1-31).");
      return;
    }
    if (isNaN(cpk) || cpk < 0) {
      setError("Please enter a valid cost per kWh (>=0).");
      return;
    }

    const pKw = pWatts / 1000;
    const dailyEnergyKwh = pKw * hpd;
    const monthlyEnergyKwh = dailyEnergyKwh * dpm;
    const calculatedMonthlyCost = monthlyEnergyKwh * cpk;

    if (!isFinite(monthlyEnergyKwh) || !isFinite(calculatedMonthlyCost)) {
        setError("Could not calculate cost. Please check inputs, values might be too large.");
        return;
    }

    setMonthlyConsumptionKwh(formatNumber(monthlyEnergyKwh, 2));
    setMonthlyCost(formatCurrency(calculatedMonthlyCost));
  };

  const handleClear = () => {
    setPowerWatts("");
    setHoursPerDay("");
    setDaysPerMonth("30");
    setCostPerKwh("");
    setMonthlyConsumptionKwh(null);
    setMonthlyCost(null);
    setError(null);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="powerWatts" className="flex items-center">
            <Zap className="mr-2 h-4 w-4 text-muted-foreground" />
            Appliance Power (Watts)
          </Label>
          <Input
            id="powerWatts" type="number" step="any" placeholder="e.g., 100"
            value={powerWatts} onChange={handleInputChange(setPowerWatts)}
            aria-label="Appliance Power in Watts"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="hoursPerDay" className="flex items-center">
            <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
            Hours Used Per Day
          </Label>
          <Input
            id="hoursPerDay" type="number" step="any" placeholder="e.g., 8"
            value={hoursPerDay} onChange={handleInputChange(setHoursPerDay)}
            aria-label="Hours Used Per Day"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="daysPerMonth" className="flex items-center">
            <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
            Days Used Per Month
          </Label>
          <Input
            id="daysPerMonth" type="number" step="1" placeholder="e.g., 30"
            value={daysPerMonth} onChange={handleInputChange(setDaysPerMonth)}
            aria-label="Days Used Per Month"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="costPerKwh" className="flex items-center">
            <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
            Cost of Electricity (per kWh)
          </Label>
          <Input
            id="costPerKwh" type="number" step="any" placeholder="e.g., 0.15"
            value={costPerKwh} onChange={handleInputChange(setCostPerKwh)}
            aria-label="Cost of Electricity per kWh"
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <Button onClick={handleCalculate} className="w-full sm:w-auto flex-grow">
          <Calculator className="mr-2 h-4 w-4" /> Calculate Cost
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

      {monthlyCost !== null && monthlyConsumptionKwh !== null && (
        <Card className="bg-accent/10 border-accent/50">
          <CardHeader className="py-3 px-4"><CardTitle className="flex items-center text-primary text-base"><DollarSign className="mr-2 h-5 w-5" />Estimated Monthly Cost</CardTitle></CardHeader>
          <CardContent className="p-4 space-y-2">
            <div className="flex justify-between items-center">
              <p className="text-md text-foreground">Monthly Energy Consumption:</p>
              <p className="text-lg font-medium text-primary/90">{monthlyConsumptionKwh} kWh</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-md text-foreground">Estimated Monthly Cost:</p>
              <p className="text-xl font-semibold text-primary">{monthlyCost}</p>
            </div>
          </CardContent>
        </Card>
      )}
       <Card className="bg-muted/30 mt-6">
        <CardHeader className="py-2 px-3"><CardTitle className="text-sm font-medium text-muted-foreground">How to use:</CardTitle></CardHeader>
        <CardContent className="text-sm py-2 px-3 text-muted-foreground space-y-1">
            <p>Enter the power rating of your appliance in Watts (usually found on a label on the appliance), how many hours a day you use it, the number of days per month you use it, and your electricity cost per kilowatt-hour (kWh) from your utility bill. Click 'Calculate Cost' to estimate the monthly expense.</p>
        </CardContent>
      </Card>
    </div>
  );
}
