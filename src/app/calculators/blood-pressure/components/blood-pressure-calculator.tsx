
"use client";

import { useState, type ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AlertCircle, Activity, Eraser, Heart } from "lucide-react";

interface BloodPressureCategory {
  name: string;
  systolicRange: string;
  diastolicRange: string;
  colorClass: string;
  advice: string;
}

const categories: BloodPressureCategory[] = [
  { name: "Normal", systolicRange: "<120", diastolicRange: "<80", colorClass: "text-green-600 dark:text-green-500", advice: "Maintain a healthy lifestyle." },
  { name: "Elevated", systolicRange: "120-129", diastolicRange: "<80", colorClass: "text-yellow-500 dark:text-yellow-400", advice: "Consider lifestyle changes. Monitor your blood pressure." },
  { name: "Hypertension Stage 1", systolicRange: "130-139", diastolicRange: "80-89", colorClass: "text-orange-500 dark:text-orange-400", advice: "Lifestyle changes are recommended. Your doctor may consider medication." },
  { name: "Hypertension Stage 2", systolicRange: "140+", diastolicRange: "90+", colorClass: "text-red-500 dark:text-red-400", advice: "Lifestyle changes and medication are often needed. Consult your doctor." },
  { name: "Hypertensive Crisis", systolicRange: ">180", diastolicRange: ">120", colorClass: "text-red-700 dark:text-red-600 font-bold", advice: "Seek immediate medical attention." },
];

const getCategory = (systolic: number, diastolic: number): BloodPressureCategory | null => {
  if (systolic > 180 || diastolic > 120) return categories[4];
  if (systolic >= 140 || diastolic >= 90) return categories[3];
  if ((systolic >= 130 && systolic <= 139) || (diastolic >= 80 && diastolic <= 89)) return categories[2];
  if (systolic >= 120 && systolic <= 129 && diastolic < 80) return categories[1];
  if (systolic < 120 && diastolic < 80) return categories[0];
  return null; // Should not happen if inputs are valid integers
};


export function BloodPressureCalculator() {
  const [systolic, setSystolic] = useState<string>("");
  const [diastolic, setDiastolic] = useState<string>("");
  const [resultCategory, setResultCategory] = useState<BloodPressureCategory | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
      setError(null);
      setResultCategory(null);
    };

  const handleCheckPressure = () => {
    setError(null);
    setResultCategory(null);

    const sys = parseInt(systolic, 10);
    const dia = parseInt(diastolic, 10);

    if (isNaN(sys) || sys <= 0 || !Number.isInteger(sys)) {
      setError("Please enter a valid positive integer for Systolic pressure.");
      return;
    }
    if (isNaN(dia) || dia <= 0 || !Number.isInteger(dia)) {
      setError("Please enter a valid positive integer for Diastolic pressure.");
      return;
    }
    if (sys <= dia) {
        setError("Systolic pressure must be greater than diastolic pressure.");
        return;
    }
    if (sys > 300 || dia > 200) { // Basic sanity check for very high values
        setError("Entered values are unusually high. Please double-check.");
        return;
    }


    const category = getCategory(sys, dia);
    if (category) {
      setResultCategory(category);
    } else {
      setError("Could not determine blood pressure category. Please check inputs.");
    }
  };

  const handleClear = () => {
    setSystolic("");
    setDiastolic("");
    setResultCategory(null);
    setError(null);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="systolic" className="flex items-center">
            <Heart className="mr-2 h-4 w-4 text-muted-foreground" />
            Systolic Pressure (mmHg)
          </Label>
          <Input
            id="systolic" type="number" placeholder="e.g., 120"
            value={systolic} onChange={handleInputChange(setSystolic)}
            aria-label="Systolic Blood Pressure in mmHg"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="diastolic" className="flex items-center">
            <Heart className="mr-2 h-4 w-4 text-muted-foreground" />
            Diastolic Pressure (mmHg)
          </Label>
          <Input
            id="diastolic" type="number" placeholder="e.g., 80"
            value={diastolic} onChange={handleInputChange(setDiastolic)}
            aria-label="Diastolic Blood Pressure in mmHg"
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <Button onClick={handleCheckPressure} className="w-full sm:w-auto flex-grow">
          <Activity className="mr-2 h-4 w-4" /> Check Blood Pressure
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

      {resultCategory && (
        <Card className="bg-accent/10 border-accent/50">
          <CardHeader className="py-3 px-4">
            <CardTitle className="flex items-center text-primary text-base">
              <Activity className="mr-2 h-5 w-5" /> Blood Pressure Category
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-2">
            <p className="text-xl font-semibold">
              Your reading: <span className="text-foreground/90">{systolic} / {diastolic} mmHg</span>
            </p>
            <p className={`text-2xl font-bold ${resultCategory.colorClass}`}>
              Category: {resultCategory.name}
            </p>
            <p className="text-sm text-muted-foreground">
              Systolic Range: {resultCategory.systolicRange} mmHg, Diastolic Range: {resultCategory.diastolicRange} mmHg
            </p>
            <p className="text-sm mt-1">{resultCategory.advice}</p>
          </CardContent>
        </Card>
      )}
       <Card className="bg-muted/30 mt-6">
        <CardHeader className="py-2 px-3"><CardTitle className="text-sm font-medium text-muted-foreground">How to use:</CardTitle></CardHeader>
        <CardContent className="text-sm py-2 px-3 text-muted-foreground space-y-1">
            <p>Enter your systolic (upper number) and diastolic (lower number) blood pressure readings. Click 'Check Blood Pressure' to see the category your reading falls into based on general guidelines.</p>
            <p className="text-xs font-semibold text-destructive/80">Disclaimer: This calculator is for informational purposes only and not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.</p>
        </CardContent>
      </Card>
       <Card className="bg-card mt-4">
        <CardHeader className="py-2 px-3"><CardTitle className="text-xs font-medium text-muted-foreground">Blood Pressure Categories Chart (General Guidelines):</CardTitle></CardHeader>
        <CardContent className="py-2 px-3 text-xs">
            <ul className="space-y-1">
                {categories.map(cat => (
                    <li key={cat.name}>
                        <span className={`font-semibold ${cat.colorClass}`}>{cat.name}:</span>
                        <span className="text-muted-foreground"> Systolic {cat.systolicRange} mmHg AND/OR Diastolic {cat.diastolicRange} mmHg</span>
                    </li>
                ))}
            </ul>
        </CardContent>
       </Card>
    </div>
  );
}
