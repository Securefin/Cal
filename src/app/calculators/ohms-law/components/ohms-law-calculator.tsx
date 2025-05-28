
"use client";

import { useState, useEffect, type ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Calculator as CalculatorIcon, Eraser } from "lucide-react";

export function OhmsLawCalculator() {
  const [voltage, setVoltage] = useState<string>("");
  const [current, setCurrent] = useState<string>("");
  const [resistance, setResistance] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const vStr = voltage;
    const iStr = current;
    const rStr = resistance;

    const numV = parseFloat(vStr);
    const numI = parseFloat(iStr);
    const numR = parseFloat(rStr);

    const isVValid = !isNaN(numV) && vStr.trim() !== "";
    const isIValid = !isNaN(numI) && iStr.trim() !== "";
    const isRValid = !isNaN(numR) && rStr.trim() !== "";
    
    let activeError: string | null = null;

    if (vStr.trim() !== "" && !isVValid) activeError = "Invalid Voltage input.";
    else if (iStr.trim() !== "" && !isIValid) activeError = "Invalid Current input.";
    else if (rStr.trim() !== "" && !isRValid) activeError = "Invalid Resistance input.";
    
    const validCount = [isVValid, isIValid, isRValid].filter(Boolean).length;

    if (activeError) {
      setError(activeError);
      return;
    }
    setError(null); // Clear general errors if individual inputs are fine or empty

    if (validCount === 2) {
      if (vStr.trim() === "" && isIValid && isRValid) {
        const result = numI * numR;
        setVoltage(Number(result.toFixed(5)).toString());
      } else if (iStr.trim() === "" && isVValid && isRValid) {
        if (numR === 0) {
          setError("Resistance (R) cannot be zero when calculating current (I).");
          setCurrent(""); 
        } else {
          const result = numV / numR;
          setCurrent(Number(result.toFixed(5)).toString());
        }
      } else if (rStr.trim() === "" && isVValid && isIValid) {
        if (numI === 0) {
          setError("Current (I) cannot be zero when calculating resistance (R).");
          setResistance("");
        } else {
          const result = numV / numI;
          setResistance(Number(result.toFixed(5)).toString());
        }
      }
    }
  }, [voltage, current, resistance]);

  const handleInputChange = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setter(value);
    // No need to clear other fields, useEffect will handle recalculation if one becomes empty.
  };

  const handleClearAll = () => {
    setVoltage("");
    setCurrent("");
    setResistance("");
    setError(null);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="voltage" className="flex justify-between">
            <span>Voltage (V)</span>
            <span className="text-muted-foreground">Volts</span>
          </Label>
          <Input
            id="voltage"
            type="text"
            inputMode="decimal"
            placeholder="Enter Voltage"
            value={voltage}
            onChange={(e) => handleInputChange(e.target.value, setVoltage)}
            aria-label="Voltage in Volts"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="current" className="flex justify-between">
            <span>Current (I)</span>
            <span className="text-muted-foreground">Amperes</span>
          </Label>
          <Input
            id="current"
            type="text"
            inputMode="decimal"
            placeholder="Enter Current"
            value={current}
            onChange={(e) => handleInputChange(e.target.value, setCurrent)}
            aria-label="Current in Amperes"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="resistance" className="flex justify-between">
            <span>Resistance (R)</span>
            <span className="text-muted-foreground">Ohms (Ω)</span>
          </Label>
          <Input
            id="resistance"
            type="text"
            inputMode="decimal"
            placeholder="Enter Resistance"
            value={resistance}
            onChange={(e) => handleInputChange(e.target.value, setResistance)}
            aria-label="Resistance in Ohms"
          />
        </div>
      </div>

      <Button onClick={handleClearAll} variant="outline" className="w-full">
        <Eraser className="mr-2 h-4 w-4" /> Clear All
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
    </div>
  );
}
