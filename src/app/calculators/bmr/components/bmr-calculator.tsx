
"use client";

import { useState, type ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Calculator, Eraser, User, Weight, Ruler, HeartPulse } from "lucide-react";

type Gender = "male" | "female";

export function BmrCalculator() {
  const [age, setAge] = useState<string>("");
  const [gender, setGender] = useState<Gender>("male");
  const [weightKg, setWeightKg] = useState<string>("");
  const [heightCm, setHeightCm] = useState<string>("");
  
  const [bmrResult, setBmrResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
      setError(null);
      setBmrResult(null);
    };

  const handleCalculate = () => {
    setError(null);
    setBmrResult(null);

    const numAge = parseInt(age, 10);
    const numWeightKg = parseFloat(weightKg);
    const numHeightCm = parseFloat(heightCm);

    if (isNaN(numAge) || numAge <= 0 || !Number.isInteger(numAge)) {
      setError("Please enter a valid age in years (must be a positive integer).");
      return;
    }
    if (isNaN(numWeightKg) || numWeightKg <= 0) {
      setError("Please enter a valid weight in kilograms (must be > 0).");
      return;
    }
    if (isNaN(numHeightCm) || numHeightCm <= 0) {
      setError("Please enter a valid height in centimeters (must be > 0).");
      return;
    }

    let calculatedBmr: number;
    // Mifflin-St Jeor Equation:
    // Men: BMR = (10 * weight in kg) + (6.25 * height in cm) - (5 * age in years) + 5
    // Women: BMR = (10 * weight in kg) + (6.25 * height in cm) - (5 * age in years) - 161
    if (gender === "male") {
      calculatedBmr = (10 * numWeightKg) + (6.25 * numHeightCm) - (5 * numAge) + 5;
    } else { // female
      calculatedBmr = (10 * numWeightKg) + (6.25 * numHeightCm) - (5 * numAge) - 161;
    }

    if (!isFinite(calculatedBmr) || isNaN(calculatedBmr)) {
      setError("Could not calculate BMR. Please check your inputs.");
      return;
    }
    
    setBmrResult(Math.round(calculatedBmr).toString()); // BMR is usually shown as whole number
  };

  const handleClear = () => {
    setAge("");
    setGender("male");
    setWeightKg("");
    setHeightCm("");
    setBmrResult(null);
    setError(null);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="age" className="flex items-center">
            <User className="mr-2 h-4 w-4 text-muted-foreground" />
            Age (years)
          </Label>
          <Input
            id="age" type="number" placeholder="e.g., 30"
            value={age} onChange={handleInputChange(setAge)}
            aria-label="Age in years"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="flex items-center">
             <User className="mr-2 h-4 w-4 text-muted-foreground" /> Gender
          </Label>
          <RadioGroup
            value={gender}
            onValueChange={(value) => {
              setGender(value as Gender);
              setError(null);
              setBmrResult(null);
            }}
            className="flex space-x-4 pt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="male" id="male" />
              <Label htmlFor="male" className="font-normal">Male</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="female" id="female" />
              <Label htmlFor="female" className="font-normal">Female</Label>
            </div>
          </RadioGroup>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="weightKg" className="flex items-center">
            <Weight className="mr-2 h-4 w-4 text-muted-foreground" />
            Weight (kg)
          </Label>
          <Input
            id="weightKg" type="number" step="any" placeholder="e.g., 70"
            value={weightKg} onChange={handleInputChange(setWeightKg)}
            aria-label="Weight in kilograms"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="heightCm" className="flex items-center">
            <Ruler className="mr-2 h-4 w-4 text-muted-foreground" />
            Height (cm)
          </Label>
          <Input
            id="heightCm" type="number" step="any" placeholder="e.g., 175"
            value={heightCm} onChange={handleInputChange(setHeightCm)}
            aria-label="Height in centimeters"
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <Button onClick={handleCalculate} className="w-full sm:w-auto flex-grow">
          <Calculator className="mr-2 h-4 w-4" /> Calculate BMR
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

      {bmrResult !== null && (
        <Card className="bg-accent/10 border-accent/50">
          <CardHeader className="py-3 px-4">
            <CardTitle className="flex items-center text-primary text-base">
              <HeartPulse className="mr-2 h-5 w-5" /> BMR Result
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-2">
            <p className="text-sm text-muted-foreground">Your estimated Basal Metabolic Rate is:</p>
            <p className="text-3xl font-bold text-primary">{bmrResult} Calories/day</p>
          </CardContent>
        </Card>
      )}
       <Card className="bg-muted/30 mt-6">
        <CardHeader className="py-2 px-3"><CardTitle className="text-sm font-medium text-muted-foreground">How to use:</CardTitle></CardHeader>
        <CardContent className="text-sm py-2 px-3 text-muted-foreground space-y-1">
            <p>Enter your age, select your gender, and provide your current weight (in kg) and height (in cm). Click 'Calculate BMR' to estimate your Basal Metabolic Rate.</p>
            
        </CardContent>
      </Card>
    </div>
  );
}
