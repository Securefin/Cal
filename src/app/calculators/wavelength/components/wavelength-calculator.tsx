
"use client";

import { useState, useEffect, type ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Eraser, Signal as SignalIcon } from "lucide-react";

const SPEED_OF_LIGHT = 299792458; // m/s

export function WavelengthCalculator() {
  const [frequency, setFrequency] = useState<string>("");
  const [wavelength, setWavelength] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [lastEdited, setLastEdited] = useState<"frequency" | "wavelength" | null>(null);

  useEffect(() => {
    if (!lastEdited) return;

    const freqVal = parseFloat(frequency);
    const waveVal = parseFloat(wavelength);

    setError(null); // Clear previous errors

    if (lastEdited === "frequency") {
      if (frequency.trim() === "") {
        setWavelength(""); // Clear wavelength if frequency is cleared
        return;
      }
      if (isNaN(freqVal) || freqVal <= 0) {
        setError("Frequency must be a positive number.");
        setWavelength("");
        return;
      }
      const calculatedWavelength = SPEED_OF_LIGHT / freqVal;
      setWavelength(Number(calculatedWavelength.toPrecision(6)).toString());
    } else if (lastEdited === "wavelength") {
      if (wavelength.trim() === "") {
        setFrequency(""); // Clear frequency if wavelength is cleared
        return;
      }
      if (isNaN(waveVal) || waveVal <= 0) {
        setError("Wavelength must be a positive number.");
        setFrequency("");
        return;
      }
      const calculatedFrequency = SPEED_OF_LIGHT / waveVal;
      setFrequency(Number(calculatedFrequency.toPrecision(6)).toString());
    }
  }, [frequency, wavelength, lastEdited]);

  const handleFrequencyChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFrequency(e.target.value);
    if (e.target.value.trim() !== "" && wavelength.trim() !== "") {
        setWavelength(""); // Clear wavelength if frequency is being actively edited
    }
    setLastEdited("frequency");
  };

  const handleWavelengthChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWavelength(e.target.value);
     if (e.target.value.trim() !== "" && frequency.trim() !== "") {
        setFrequency(""); // Clear frequency if wavelength is being actively edited
    }
    setLastEdited("wavelength");
  };

  const handleClearAll = () => {
    setFrequency("");
    setWavelength("");
    setError(null);
    setLastEdited(null);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="frequency" className="flex justify-between">
            <span>Frequency (f)</span>
            <span className="text-muted-foreground">Hertz (Hz)</span>
          </Label>
          <Input
            id="frequency"
            type="text"
            inputMode="decimal"
            placeholder="Enter Frequency"
            value={frequency}
            onChange={handleFrequencyChange}
            aria-label="Frequency in Hertz"
          />
        </div>
        <div className="text-center text-muted-foreground text-2xl font-semibold my-2">= c / λ</div>
        <div className="space-y-1.5">
          <Label htmlFor="wavelength" className="flex justify-between">
            <span>Wavelength (λ)</span>
            <span className="text-muted-foreground">meters (m)</span>
          </Label>
          <Input
            id="wavelength"
            type="text"
            inputMode="decimal"
            placeholder="Enter Wavelength"
            value={wavelength}
            onChange={handleWavelengthChange}
            aria-label="Wavelength in meters"
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
