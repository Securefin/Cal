
"use client";

import { useState, type ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AlertCircle, Calculator, Eraser, User, Weight, Ruler, Activity, Flame, TrendingDown, TrendingUp } from "lucide-react";

type Gender = "male" | "female";
type ActivityLevel = "sedentary" | "light" | "moderate" | "active" | "extra";

const activityFactors: Record<ActivityLevel, number> = {
  sedentary: 1.2,       // little or no exercise
  light: 1.375,         // light exercise/sports 1-3 days/week
  moderate: 1.55,       // moderate exercise/sports 3-5 days/week
  active: 1.725,        // hard exercise/sports 6-7 days a week
  extra: 1.9,           // very hard exercise/sports & physical job or 2x training
};

const activityDescriptions: Record<ActivityLevel, string> = {
  sedentary: "Little or no exercise, desk job",
  light: "Light exercise or sports 1-3 days a week",
  moderate: "Moderate exercise or sports 3-5 days a week",
  active: "Hard exercise or sports 6-7 days a week",
  extra: "Very hard exercise, physical job, or training twice a day",
};


export function CalorieCalculator() {
  const [age, setAge] = useState<string>("");
  const [gender, setGender] = useState<Gender>("male");
  const [weightKg, setWeightKg] = useState<string>("");
  const [heightCm, setHeightCm] = useState<string>("");
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>("moderate");
  
  const [bmrResult, setBmrResult] = useState<number | null>(null);
  const [tdeeResult, setTdeeResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const clearResults = () => {
    setError(null);
    setBmrResult(null);
    setTdeeResult(null);
  }

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
      clearResults();
    };
  
  const handleSelectChange = (value: string) => {
    setActivityLevel(value as ActivityLevel);
    clearResults();
  };

  const handleGenderChange = (value: string) => {
    setGender(value as Gender);
    clearResults();
  }

  const calculateBmr = (numAge: number, numWeightKg: number, numHeightCm: number, currentGender: Gender): number | null => {
    if (isNaN(numAge) || numAge <= 0 || !Number.isInteger(numAge)) {
      setError("Please enter a valid age in years (must be a positive integer)."); return null;
    }
    if (isNaN(numWeightKg) || numWeightKg <= 0) {
      setError("Please enter a valid weight in kilograms (must be > 0)."); return null;
    }
    if (isNaN(numHeightCm) || numHeightCm <= 0) {
      setError("Please enter a valid height in centimeters (must be > 0)."); return null;
    }

    let calculatedBmr: number;
    if (currentGender === "male") {
      calculatedBmr = (10 * numWeightKg) + (6.25 * numHeightCm) - (5 * numAge) + 5;
    } else { // female
      calculatedBmr = (10 * numWeightKg) + (6.25 * numHeightCm) - (5 * numAge) - 161;
    }
    return calculatedBmr;
  };

  const handleCalculate = () => {
    clearResults();

    const numAge = parseInt(age, 10);
    const numWeightKg = parseFloat(weightKg);
    const numHeightCm = parseFloat(heightCm);

    const bmr = calculateBmr(numAge, numWeightKg, numHeightCm, gender);
    if (bmr === null || !isFinite(bmr) || isNaN(bmr)) {
      if(!error) setError("Could not calculate BMR. Please check your inputs.");
      return;
    }
    
    const roundedBmr = Math.round(bmr);
    setBmrResult(roundedBmr);

    const factor = activityFactors[activityLevel];
    const calculatedTdee = roundedBmr * factor;

    if (!isFinite(calculatedTdee) || isNaN(calculatedTdee)) {
      setError("Could not calculate TDEE. Please check your inputs.");
      return;
    }
    
    setTdeeResult(Math.round(calculatedTdee));
  };

  const handleClearAll = () => {
    setAge("");
    setGender("male");
    setWeightKg("");
    setHeightCm("");
    setActivityLevel("moderate");
    clearResults();
  };
  
  const calorieGoal = (tdee: number | null, adjustment: number): string => {
    if (tdee === null) return "N/A";
    return Math.round(tdee + adjustment).toLocaleString();
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="age" className="flex items-center">
            <User className="mr-2 h-4 w-4 text-muted-foreground" /> Age (years)
          </Label>
          <Input id="age" type="number" placeholder="e.g., 30" value={age} onChange={handleInputChange(setAge)} />
        </div>
        <div className="space-y-1.5">
          <Label className="flex items-center"><User className="mr-2 h-4 w-4 text-muted-foreground" /> Gender</Label>
          <RadioGroup value={gender} onValueChange={handleGenderChange} className="flex space-x-4 pt-2">
            <div className="flex items-center space-x-2"><RadioGroupItem value="male" id="male" /><Label htmlFor="male" className="font-normal">Male</Label></div>
            <div className="flex items-center space-x-2"><RadioGroupItem value="female" id="female" /><Label htmlFor="female" className="font-normal">Female</Label></div>
          </RadioGroup>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="weightKg" className="flex items-center">
            <Weight className="mr-2 h-4 w-4 text-muted-foreground" /> Weight (kg)
          </Label>
          <Input id="weightKg" type="number" step="any" placeholder="e.g., 70" value={weightKg} onChange={handleInputChange(setWeightKg)} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="heightCm" className="flex items-center">
            <Ruler className="mr-2 h-4 w-4 text-muted-foreground" /> Height (cm)
          </Label>
          <Input id="heightCm" type="number" step="any" placeholder="e.g., 175" value={heightCm} onChange={handleInputChange(setHeightCm)} />
        </div>
      </div>
      
      <div className="space-y-1.5">
          <Label htmlFor="activityLevel" className="flex items-center">
            <Activity className="mr-2 h-4 w-4 text-muted-foreground" /> Activity Level
          </Label>
          <Select value={activityLevel} onValueChange={handleSelectChange}>
            <SelectTrigger id="activityLevel" aria-label="Select activity level">
              <SelectValue placeholder="Select activity level" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(activityDescriptions).map(([key, desc]) => (
                <SelectItem key={key} value={key}>{desc}</SelectItem>
              ))}
            </SelectContent>
          </Select>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <Button onClick={handleCalculate} className="w-full sm:w-auto flex-grow">
          <Calculator className="mr-2 h-4 w-4" /> Calculate Calories
        </Button>
        <Button onClick={handleClearAll} variant="outline" className="w-full sm:w-auto">
          <Eraser className="mr-2 h-4 w-4" /> Clear All
        </Button>
      </div>

      {error && (
        <Card className="bg-destructive/10 border-destructive/50">
          <CardHeader className="py-2 px-3"><CardTitle className="flex items-center text-destructive text-sm"><AlertCircle className="mr-2 h-4 w-4" />Error</CardTitle></CardHeader>
          <CardContent className="py-2 px-3"><p className="text-destructive text-sm">{error}</p></CardContent>
        </Card>
      )}

      {tdeeResult !== null && bmrResult !== null && (
        <div className="space-y-4">
          <Card className="bg-accent/10 border-accent/50">
            <CardHeader className="py-3 px-4">
              <CardTitle className="flex items-center text-primary text-base">
                <Flame className="mr-2 h-5 w-5" /> Estimated Daily Calorie Needs
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Your Basal Metabolic Rate (BMR) is</p>
                <p className="text-3xl font-bold text-primary">{bmrResult.toLocaleString()} <span className="text-lg">Calories/day</span></p>
              </div>
              <div className="text-center mt-3">
                <p className="text-sm text-muted-foreground">Your Total Daily Energy Expenditure (TDEE) is</p>
                <p className="text-4xl font-bold text-primary">{tdeeResult.toLocaleString()} <span className="text-xl">Calories/day</span></p>
                <p className="text-xs text-muted-foreground">({activityDescriptions[activityLevel]})</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="py-3 px-4">
                <CardTitle className="text-base text-foreground/90">Calorie Goals for Weight Management</CardTitle>
                <CardDescription className="text-xs">These are estimates. Consult a professional for personalized advice.</CardDescription>
            </CardHeader>
            <CardContent className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                 <Card className="bg-muted/30">
                    <CardHeader className="py-2 px-3">
                        <CardTitle className="text-sm font-medium flex items-center text-orange-600 dark:text-orange-500">
                            <TrendingDown className="mr-2 h-4 w-4"/> Mild Weight Loss (~0.5 kg/week)
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="py-2 px-3">
                        <p className="text-xl font-semibold text-orange-600 dark:text-orange-500">{calorieGoal(tdeeResult, -500)} <span className="text-sm">Calories/day</span></p>
                    </CardContent>
                </Card>
                <Card className="bg-muted/30">
                    <CardHeader className="py-2 px-3">
                        <CardTitle className="text-sm font-medium flex items-center text-green-600 dark:text-green-500">
                            <TrendingUp className="mr-2 h-4 w-4"/> Mild Weight Gain (~0.5 kg/week)
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="py-2 px-3">
                         <p className="text-xl font-semibold text-green-600 dark:text-green-500">{calorieGoal(tdeeResult, 500)} <span className="text-sm">Calories/day</span></p>
                    </CardContent>
                </Card>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

    