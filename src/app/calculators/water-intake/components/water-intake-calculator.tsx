
"use client";

import { useState, type ChangeEvent } from "react";
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
import { AlertCircle, Calculator, Eraser, Weight, Activity as ActivityIcon, Droplet } from "lucide-react"; // Renamed Activity to ActivityIcon

type ActivityLevel = "sedentary" | "light" | "moderate" | "active" | "very_active";

const activityLevelOptions: { value: ActivityLevel; label: string; adjustmentLiters: number }[] = [
  { value: "sedentary", label: "Sedentary (little or no exercise)", adjustmentLiters: 0 },
  { value: "light", label: "Lightly Active (light exercise/sports 1-3 days/week)", adjustmentLiters: 0.35 }, // Approx 12 oz
  { value: "moderate", label: "Moderately Active (moderate exercise/sports 3-5 days/week)", adjustmentLiters: 0.7 }, // Approx 24 oz
  { value: "active", label: "Active (hard exercise/sports 6-7 days a week)", adjustmentLiters: 1.05 }, // Approx 36 oz
  { value: "very_active", label: "Very Active (very hard exercise/physical job or 2x training)", adjustmentLiters: 1.4 }, // Approx 48 oz
];


export function WaterIntakeCalculator() {
  const [weightKg, setWeightKg] = useState<string>("");
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>("light");
  
  const [recommendedIntake, setRecommendedIntake] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
      setError(null);
      setRecommendedIntake(null);
    };
  
  const handleSelectChange = (value: string) => {
    setActivityLevel(value as ActivityLevel);
    setError(null);
    setRecommendedIntake(null);
  }

  const handleCalculate = () => {
    setError(null);
    setRecommendedIntake(null);

    const weight = parseFloat(weightKg);

    if (isNaN(weight) || weight <= 0) {
      setError("Please enter a valid weight in kilograms (must be > 0).");
      return;
    }
    if (weight > 300) { // Sanity check
      setError("Please enter a realistic weight.");
      return;
    }

    const baseIntakeLiters = weight * 0.033; // 33ml per kg of body weight
    
    const selectedActivity = activityLevelOptions.find(opt => opt.value === activityLevel);
    if (!selectedActivity) {
        setError("Invalid activity level selected.");
        return;
    }
    const activityAdjustment = selectedActivity.adjustmentLiters;

    const totalIntakeLiters = baseIntakeLiters + activityAdjustment;

    if (!isFinite(totalIntakeLiters) || isNaN(totalIntakeLiters)) {
      setError("Could not calculate water intake. Please check your inputs.");
      return;
    }
    
    setRecommendedIntake(totalIntakeLiters.toFixed(1)); // Round to 1 decimal place
  };

  const handleClear = () => {
    setWeightKg("");
    setActivityLevel("light");
    setRecommendedIntake(null);
    setError(null);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4">
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
          <Label htmlFor="activityLevel" className="flex items-center">
            <ActivityIcon className="mr-2 h-4 w-4 text-muted-foreground" />
            Activity Level
          </Label>
          <Select value={activityLevel} onValueChange={handleSelectChange}>
            <SelectTrigger id="activityLevel" aria-label="Select activity level">
              <SelectValue placeholder="Select your activity level" />
            </SelectTrigger>
            <SelectContent>
              {activityLevelOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <Button onClick={handleCalculate} className="w-full sm:w-auto flex-grow">
          <Calculator className="mr-2 h-4 w-4" /> Calculate Intake
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

      {recommendedIntake !== null && (
        <Card className="bg-accent/10 border-accent/50">
          <CardHeader className="py-3 px-4">
            <CardTitle className="flex items-center text-primary text-base">
              <Droplet className="mr-2 h-5 w-5" /> Estimated Daily Water Intake
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-primary">{recommendedIntake} Liters</p>
            <p className="text-xs text-muted-foreground mt-1">
              (This is approximately {(parseFloat(recommendedIntake) * 33.814).toFixed(1)} fl oz or {(parseFloat(recommendedIntake) / 0.236588).toFixed(1)} cups)
            </p>
          </CardContent>
        </Card>
      )}
       <Card className="bg-muted/30 mt-6">
        <CardHeader className="py-2 px-3"><CardTitle className="text-sm font-medium text-muted-foreground">How to use:</CardTitle></CardHeader>
        <CardContent className="text-sm py-2 px-3 text-muted-foreground space-y-1">
            <p>Enter your weight in kilograms and select your general activity level. The calculator provides an estimate of your daily water needs. Individual requirements can vary based on climate, health conditions, and other factors.</p>
        </CardContent>
      </Card>
    </div>
  );
}
