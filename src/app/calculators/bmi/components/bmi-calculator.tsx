
"use client";

import { useState, type ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Calculator, Eraser, Weight, Ruler, TrendingUp } from "lucide-react";

interface BmiCategory {
  label: string;
  colorClass: string;
  range: string;
}

const bmiCategories: BmiCategory[] = [
  { label: "Underweight", colorClass: "text-blue-500 dark:text-blue-400", range: "< 18.5" },
  { label: "Normal weight", colorClass: "text-green-600 dark:text-green-500", range: "18.5 – 24.9" },
  { label: "Overweight", colorClass: "text-yellow-500 dark:text-yellow-400", range: "25 – 29.9" },
  { label: "Obesity Class I", colorClass: "text-orange-500 dark:text-orange-400", range: "30 – 34.9" },
  { label: "Obesity Class II", colorClass: "text-red-500 dark:text-red-400", range: "35 – 39.9" },
  { label: "Obesity Class III", colorClass: "text-red-700 dark:text-red-500", range: "≥ 40" },
];

export function BmiCalculator() {
  const [weightKg, setWeightKg] = useState<string>("");
  const [heightCm, setHeightCm] = useState<string>("");
  
  const [bmiResult, setBmiResult] = useState<string | null>(null);
  const [bmiCategory, setBmiCategory] = useState<BmiCategory | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
      setError(null);
      setBmiResult(null);
      setBmiCategory(null);
    };

  const determineBmiCategory = (bmi: number): BmiCategory => {
    if (bmi < 18.5) return bmiCategories[0];
    if (bmi < 25) return bmiCategories[1];
    if (bmi < 30) return bmiCategories[2];
    if (bmi < 35) return bmiCategories[3];
    if (bmi < 40) return bmiCategories[4];
    return bmiCategories[5];
  };

  const handleCalculate = () => {
    setError(null);
    setBmiResult(null);
    setBmiCategory(null);

    const weight = parseFloat(weightKg);
    const height = parseFloat(heightCm);

    if (isNaN(weight) || weight <= 0) {
      setError("Please enter a valid weight in kilograms (must be > 0).");
      return;
    }
    if (isNaN(height) || height <= 0) {
      setError("Please enter a valid height in centimeters (must be > 0).");
      return;
    }

    const heightInMeters = height / 100;
    const calculatedBmi = weight / (heightInMeters * heightInMeters);

    if (!isFinite(calculatedBmi) || isNaN(calculatedBmi)) {
      setError("Could not calculate BMI. Please check your inputs.");
      return;
    }
    
    const roundedBmi = parseFloat(calculatedBmi.toFixed(1));
    setBmiResult(roundedBmi.toString());
    setBmiCategory(determineBmiCategory(roundedBmi));
  };

  const handleClear = () => {
    setWeightKg("");
    setHeightCm("");
    setBmiResult(null);
    setBmiCategory(null);
    setError(null);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <Calculator className="mr-2 h-4 w-4" /> Calculate BMI
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

      {bmiResult !== null && bmiCategory !== null && (
        <Card className="bg-accent/10 border-accent/50">
          <CardHeader className="py-3 px-4">
            <CardTitle className="flex items-center text-primary text-base">
              <TrendingUp className="mr-2 h-5 w-5" /> BMI Result
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Your BMI is</p>
              <p className="text-4xl font-bold text-primary">{bmiResult}</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold">
                This is considered: <span className={bmiCategory.colorClass}>{bmiCategory.label}</span>
              </p>
              <p className="text-xs text-muted-foreground">
                (BMI Range: {bmiCategory.range})
              </p>
            </div>
             <Card className="mt-4 bg-muted/50">
                <CardHeader className="py-2 px-3">
                    <CardTitle className="text-xs font-medium text-muted-foreground">BMI Categories:</CardTitle>
                </CardHeader>
                <CardContent className="py-2 px-3 text-xs text-muted-foreground">
                    <ul className="space-y-0.5">
                    {bmiCategories.map(cat => (
                        <li key={cat.label}><span className={cat.colorClass}>{cat.label}:</span> {cat.range}</li>
                    ))}
                    </ul>
                </CardContent>
            </Card>
          </CardContent>
        </Card>
      )}
       <Card className="bg-muted/30 mt-6">
        <CardHeader className="py-2 px-3"><CardTitle className="text-sm font-medium text-muted-foreground">How to use:</CardTitle></CardHeader>
        <CardContent className="text-sm py-2 px-3 text-muted-foreground space-y-1">
            <p>Enter your weight in kilograms (kg) and your height in centimeters (cm). Click 'Calculate BMI' to see your Body Mass Index and its general interpretation.</p>
            <p className="text-xs">BMI is a general indicator and may not be accurate for athletes, pregnant women, or individuals with high muscle mass. Always consult a healthcare professional for health advice.</p>
        </CardContent>
      </Card>
    </div>
  );
}
