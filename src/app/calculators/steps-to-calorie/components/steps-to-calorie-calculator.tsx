
"use client";

import { useState, type ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Calculator, Eraser, Footprints, Weight, Flame } from "lucide-react";

export function StepsToCalorieCalculator() {
  const [steps, setSteps] = useState<string>("");
  const [weightKg, setWeightKg] = useState<string>("");
  
  const [caloriesBurned, setCaloriesBurned] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
      setError(null);
      setCaloriesBurned(null);
    };

  const handleCalculate = () => {
    setError(null);
    setCaloriesBurned(null);

    const numSteps = parseInt(steps, 10);
    const numWeightKg = parseFloat(weightKg);

    if (isNaN(numSteps) || numSteps <= 0 || !Number.isInteger(numSteps)) {
      setError("Please enter a valid positive whole number for steps.");
      return;
    }
    if (isNaN(numWeightKg) || numWeightKg <= 0) {
      setError("Please enter a valid weight in kilograms (must be > 0).");
      return;
    }
    if (numWeightKg > 300) { // Sanity check
      setError("Please enter a realistic weight.");
      return;
    }


    // Simplified formula: Calories Burned = (Steps / 20) * (Weight_kg / 68)
    // Based on ~20 steps = 1 calorie for a 68kg (150lb) person.
    const calculatedCalories = (numSteps / 20) * (numWeightKg / 68);

    if (!isFinite(calculatedCalories) || isNaN(calculatedCalories)) {
      setError("Could not calculate calories burned. Please check your inputs.");
      return;
    }
    
    setCaloriesBurned(Math.round(calculatedCalories).toString()); // Round to nearest whole calorie
  };

  const handleClear = () => {
    setSteps("");
    setWeightKg("");
    setCaloriesBurned(null);
    setError(null);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="steps" className="flex items-center">
            <Footprints className="mr-2 h-4 w-4 text-muted-foreground" />
            Number of Steps Taken
          </Label>
          <Input
            id="steps" type="number" placeholder="e.g., 10000"
            value={steps} onChange={handleInputChange(setSteps)}
            aria-label="Number of steps taken"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="weightKg" className="flex items-center">
            <Weight className="mr-2 h-4 w-4 text-muted-foreground" />
            Your Weight (kg)
          </Label>
          <Input
            id="weightKg" type="number" step="any" placeholder="e.g., 70"
            value={weightKg} onChange={handleInputChange(setWeightKg)}
            aria-label="Your weight in kilograms"
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <Button onClick={handleCalculate} className="w-full sm:w-auto flex-grow">
          <Calculator className="mr-2 h-4 w-4" /> Calculate Calories
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

      {caloriesBurned !== null && (
        <Card className="bg-accent/10 border-accent/50">
          <CardHeader className="py-3 px-4">
            <CardTitle className="flex items-center text-primary text-base">
              <Flame className="mr-2 h-5 w-5" /> Estimated Calories Burned
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-primary">{caloriesBurned} <span className="text-xl">kcal</span></p>
          </CardContent>
        </Card>
      )}
       <Card className="bg-muted/30 mt-6">
        <CardHeader className="py-2 px-3"><CardTitle className="text-sm font-medium text-muted-foreground">How to use:</CardTitle></CardHeader>
        <CardContent className="text-sm py-2 px-3 text-muted-foreground space-y-1">
            <p>Enter the total number of steps you've taken and your current weight in kilograms. The calculator will provide an estimate of the calories burned.</p>
        </CardContent>
      </Card>
    </div>
  );
}
