
"use client";

import { useState, useEffect, type ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, AlertTriangle, Info } from "lucide-react";

interface StrengthCriterion {
  id: string;
  label: string;
  regex?: RegExp; // Optional for length-based criteria
  check: (password: string) => boolean;
  met: boolean;
}

interface StrengthLevel {
  label: string;
  colorClass: string; 
  progressValue: number;
}

const strengthLevels: Record<string, StrengthLevel> = {
  EMPTY: { label: "Enter a password", colorClass: "bg-muted", progressValue: 0 },
  VERY_WEAK: { label: "Very Weak", colorClass: "bg-red-500", progressValue: 10 },
  WEAK: { label: "Weak", colorClass: "bg-orange-500", progressValue: 30 },
  MEDIUM: { label: "Medium", colorClass: "bg-yellow-500", progressValue: 50 },
  STRONG: { label: "Strong", colorClass: "bg-lime-500", progressValue: 75 },
  VERY_STRONG: { label: "Very Strong", colorClass: "bg-green-600", progressValue: 100 },
};

const initialCriteria: Omit<StrengthCriterion, 'met'>[] = [
  { id: "length8", label: "At least 8 characters", check: (pw) => pw.length >= 8 },
  { id: "length12", label: "At least 12 characters (recommended)", check: (pw) => pw.length >= 12 },
  { id: "uppercase", label: "Contains an uppercase letter (A-Z)", check: (pw) => /[A-Z]/.test(pw) },
  { id: "lowercase", label: "Contains a lowercase letter (a-z)", check: (pw) => /[a-z]/.test(pw) },
  { id: "number", label: "Contains a number (0-9)", check: (pw) => /[0-9]/.test(pw) },
  { id: "symbol", label: "Contains a symbol (!@#...)", check: (pw) => /[^A-Za-z0-9]/.test(pw) },
];

export function PasswordStrengthChecker() {
  const [password, setPassword] = useState<string>("");
  const [currentStrength, setCurrentStrength] = useState<StrengthLevel>(strengthLevels.EMPTY);
  const [checkedCriteria, setCheckedCriteria] = useState<StrengthCriterion[]>(
    initialCriteria.map(c => ({ ...c, met: false }))
  );

  useEffect(() => {
    if (password === "") {
      setCurrentStrength(strengthLevels.EMPTY);
      setCheckedCriteria(prev => prev.map(c => ({ ...c, met: false })));
      return;
    }

    let score = 0;
    let typesCount = 0;

    const updatedCriteria = initialCriteria.map(criterion => {
      const isMet = criterion.check(password);
      if (isMet) {
        if (criterion.id === "length8") score += 10;
        if (criterion.id === "length12") score += 15; // Bonus for longer
        if (["uppercase", "lowercase", "number", "symbol"].includes(criterion.id)) {
          typesCount++;
          score += 10;
        }
      }
      return { ...criterion, met: isMet };
    });
    setCheckedCriteria(updatedCriteria);
    
    // Adjust score based on number of character types included
    if (typesCount === 2) score += 5;
    if (typesCount === 3) score += 10;
    if (typesCount === 4) score += 15;

    // Cap score
    score = Math.min(score, 100);
    if (password.length < 8) score = Math.min(score, 20); // Penalize very short passwords

    if (score >= 90) setCurrentStrength(strengthLevels.VERY_STRONG);
    else if (score >= 70) setCurrentStrength(strengthLevels.STRONG);
    else if (score >= 50) setCurrentStrength(strengthLevels.MEDIUM);
    else if (score >= 25) setCurrentStrength(strengthLevels.WEAK);
    else setCurrentStrength(strengthLevels.VERY_WEAK);

  }, [password]);

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1.5">
        <Label htmlFor="passwordInput">Enter Password</Label>
        <Input
          id="passwordInput"
          type="text" // Changed from password to text to allow user to see what they type for this tool
          placeholder="Type your password here"
          value={password}
          onChange={handlePasswordChange}
          aria-label="Password to check"
          className="font-mono text-lg"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Strength:</Label>
          <span className={`font-semibold ${currentStrength.label === "Enter a password" ? "text-muted-foreground" : currentStrength.colorClass.replace('bg-', 'text-')}`}>
            {currentStrength.label}
          </span>
        </div>
        <Progress value={currentStrength.progressValue} indicatorClassName={`${currentStrength.colorClass} transition-all duration-300`} className="h-3" />
      </div>

      {password.length > 0 && (
        <Card className="bg-muted/30">
          <CardHeader className="py-3 px-4">
            <CardTitle className="text-base flex items-center">
              <Info className="mr-2 h-5 w-5 text-muted-foreground" />
              Suggestions & Checks
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-1.5 text-sm">
            {checkedCriteria.map((criterion) => (
              <div key={criterion.id} className={`flex items-center ${criterion.met ? 'text-green-600 dark:text-green-500' : 'text-orange-600 dark:text-orange-500'}`}>
                {criterion.met ? <CheckCircle2 className="mr-2 h-4 w-4" /> : <AlertTriangle className="mr-2 h-4 w-4" />}
                {criterion.label}
              </div>
            ))}
          </CardContent>
        </Card>
      )}
       <Card className="bg-card border-primary/20 mt-6">
        <CardHeader className="py-2 px-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Tips for a Strong Password:</CardTitle>
        </CardHeader>
        <CardContent className="text-sm py-2 px-3 text-muted-foreground space-y-1">
            <ul className="list-disc pl-5">
                <li>Use a long password (12 characters or more).</li>
                <li>Combine uppercase letters, lowercase letters, numbers, and symbols.</li>
                <li>Avoid common words, phrases, or easily guessable information.</li>
                <li>Use unique passwords for different accounts.</li>
            </ul>
        </CardContent>
      </Card>
    </div>
  );
}
