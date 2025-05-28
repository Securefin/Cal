
"use client";

import { useState, type ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Calculator, Eraser, Users, Weight, Ruler, Percent as PercentIcon, Flame, Dumbbell } from "lucide-react";

type Gender = "male" | "female";

export function MuscleMassCalculator() {
  const [gender, setGender] = useState<Gender>("male");
  const [weightKg, setWeightKg] = useState<string>("");
  const [heightCm, setHeightCm] = useState<string>("");
  const [neckCm, setNeckCm] = useState<string>("");
  const [waistCm, setWaistCm] = useState<string>("");
  const [hipCm, setHipCm] = useState<string>(""); // Only for female

  const [bodyFatPercentage, setBodyFatPercentage] = useState<string | null>(null);
  const [fatMass, setFatMass] = useState<string | null>(null);
  const [leanBodyMass, setLeanBodyMass] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const clearResults = () => {
    setBodyFatPercentage(null);
    setFatMass(null);
    setLeanBodyMass(null);
    setError(null);
  };

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
      clearResults();
    };
  
  const handleGenderChange = (value: string) => {
    setGender(value as Gender);
    if (value === "male") {
        setHipCm(""); // Clear hip for male as it's not used
    }
    clearResults();
  }

  const formatNumber = (value: number, digits: number = 1): string => {
    return value.toFixed(digits);
  };

  const calculateBFP = (): { bfp: number, fm: number, lbm: number } | null => {
    const weight = parseFloat(weightKg);
    const height = parseFloat(heightCm);
    const neck = parseFloat(neckCm);
    const waist = parseFloat(waistCm);
    
    if (isNaN(weight) || weight <= 0) { setError("Valid weight (kg) is required."); return null; }
    if (isNaN(height) || height <= 0) { setError("Valid height (cm) is required."); return null; }
    if (isNaN(neck) || neck <= 0) { setError("Valid neck circumference (cm) is required."); return null; }
    if (isNaN(waist) || waist <= 0) { setError("Valid waist circumference (cm) is required."); return null; }

    let bfp: number;

    if (gender === "male") {
      if (waist - neck <= 0) {
        setError("Waist circumference must be greater than neck circumference for males.");
        return null;
      }
      // Hodgdon and Beckett formula for men
      bfp = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
    } else { // Female
      const hip = parseFloat(hipCm);
      if (isNaN(hip) || hip <= 0) { setError("Valid hip circumference (cm) is required for females."); return null; }
      if (waist + hip - neck <= 0) {
        setError("Waist + Hip circumference must be greater than Neck circumference for females.");
        return null;
      }
      // Hodgdon and Beckett formula for women
      bfp = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(height)) - 450;
    }

    if (!isFinite(bfp) || isNaN(bfp) || bfp < 0 || bfp > 100) { // Basic sanity check for BFP
      setError("Could not reliably calculate Body Fat Percentage. Please check your inputs are realistic and within typical human ranges.");
      return null;
    }

    const fatMassValue = weight * (bfp / 100);
    const leanBodyMassValue = weight - fatMassValue;

    return { bfp, fm: fatMassValue, lbm: leanBodyMassValue };
  };


  const handleCalculate = () => {
    clearResults();
    const results = calculateBFP();

    if (results) {
      setBodyFatPercentage(formatNumber(results.bfp, 1));
      setFatMass(formatNumber(results.fm, 1));
      setLeanBodyMass(formatNumber(results.lbm, 1));
    }
  };

  const handleClearAll = () => {
    setGender("male");
    setWeightKg("");
    setHeightCm("");
    setNeckCm("");
    setWaistCm("");
    setHipCm("");
    clearResults();
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
        <div className="space-y-1.5">
          <Label className="flex items-center"><Users className="mr-2 h-4 w-4 text-muted-foreground" /> Gender</Label>
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
        <div className="space-y-1.5">
          <Label htmlFor="neckCm">Neck Circumference (cm)</Label>
          <Input id="neckCm" type="number" step="any" placeholder="e.g., 38" value={neckCm} onChange={handleInputChange(setNeckCm)} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="waistCm">Waist Circumference (cm)</Label>
          <Input id="waistCm" type="number" step="any" placeholder="e.g., 85" value={waistCm} onChange={handleInputChange(setWaistCm)} />
        </div>
        {gender === "female" && (
          <div className="space-y-1.5">
            <Label htmlFor="hipCm">Hip Circumference (cm)</Label>
            <Input id="hipCm" type="number" step="any" placeholder="e.g., 95" value={hipCm} onChange={handleInputChange(setHipCm)} />
          </div>
        )}
      </div>
      
      <div className="flex flex-col sm:flex-row gap-2">
        <Button onClick={handleCalculate} className="w-full sm:w-auto flex-grow">
          <Calculator className="mr-2 h-4 w-4" /> Calculate
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

      {leanBodyMass !== null && bodyFatPercentage !== null && fatMass !== null && (
        <Card className="bg-accent/10 border-accent/50">
          <CardHeader className="py-3 px-4">
            <CardTitle className="flex items-center text-primary text-base">
             Estimated Body Composition
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            <div className="flex justify-between items-center">
              <p className="text-md text-foreground flex items-center"><PercentIcon className="mr-2 h-4 w-4 text-muted-foreground" />Body Fat Percentage:</p>
              <p className="text-xl font-semibold text-primary">{bodyFatPercentage}%</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-md text-foreground flex items-center"><Flame className="mr-2 h-4 w-4 text-muted-foreground" />Fat Mass:</p>
              <p className="text-lg font-medium text-primary/90">{fatMass} kg</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-md text-foreground flex items-center"><Dumbbell className="mr-2 h-4 w-4 text-muted-foreground" />Lean Body Mass (LBM):</p>
              <p className="text-xl font-semibold text-primary">{leanBodyMass} kg</p>
            </div>
          </CardContent>
        </Card>
      )}
       <Card className="bg-muted/30 mt-6">
        <CardHeader className="py-2 px-3"><CardTitle className="text-sm font-medium text-muted-foreground">How to use:</CardTitle></CardHeader>
        <CardContent className="text-sm py-2 px-3 text-muted-foreground space-y-1">
            <p>Select your gender and enter your weight (kg), height (cm), neck circumference (cm), waist circumference (cm). If female, also enter hip circumference (cm). Click 'Calculate' for an estimation of your body fat percentage, fat mass, and lean body mass.</p>
            <p className="text-xs">Ensure circumference measurements are taken correctly (e.g., neck below larynx, waist at narrowest point or navel level, hips at widest point).</p>
        </CardContent>
      </Card>
    </div>
  );
}
