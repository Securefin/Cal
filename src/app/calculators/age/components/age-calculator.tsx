
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Calculator, Eraser, CalendarDays, UserCircle } from "lucide-react";
import { format, isValid } from "date-fns";

interface AgeResult {
  years: number;
  months: number;
  days: number;
  summary?: string;
}

export function AgeCalculator() {
  const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>(undefined);
  const [asOfDate, setAsOfDate] = useState<Date | undefined>(new Date());
  const [ageResult, setAgeResult] = useState<AgeResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculatePreciseAge = (dob: Date, aod: Date): AgeResult | null => {
    if (dob > aod) {
      setError("Date of Birth cannot be after the 'Age as of' date.");
      return null;
    }

    let years = aod.getFullYear() - dob.getFullYear();
    let months = aod.getMonth() - dob.getMonth();
    let days = aod.getDate() - dob.getDate();

    if (days < 0) {
      months--;
      // Get days in the previous month of 'as of date'
      const lastDayOfPrevMonth = new Date(aod.getFullYear(), aod.getMonth(), 0).getDate();
      days += lastDayOfPrevMonth;
    }

    if (months < 0) {
      years--;
      months += 12;
    }
    
    let summaryParts = [];
    if (years > 0) summaryParts.push(`${years} year${years > 1 ? 's' : ''}`);
    if (months > 0) summaryParts.push(`${months} month${months > 1 ? 's' : ''}`);
    if (days > 0) summaryParts.push(`${days} day${days > 1 ? 's' : ''}`);
    if (years === 0 && months === 0 && days === 0 && dob.getTime() === aod.getTime()) { // Same day
       summaryParts.push("Less than a day old (or age on birth date)");
    } else if (summaryParts.length === 0 && dob < aod) { // If dob is before aod but results in 0y 0m 0d due to rounding/exactness.
        summaryParts.push("Less than a day old");
    }


    return { years, months, days, summary: summaryParts.join(', ') || "0 days" };
  };

  const handleCalculate = () => {
    setError(null);
    setAgeResult(null);

    if (!dateOfBirth) {
      setError("Please select your Date of Birth.");
      return;
    }
    if (!asOfDate) {
      setError("Please select the 'Age as of' date.");
      return;
    }

    if (!isValid(dateOfBirth) || !isValid(asOfDate)) {
      setError("One or both selected dates are not valid.");
      return;
    }

    const result = calculatePreciseAge(dateOfBirth, asOfDate);
    if (result) {
      setAgeResult(result);
    }
  };

  const handleClear = () => {
    setDateOfBirth(undefined);
    setAsOfDate(new Date());
    setAgeResult(null);
    setError(null);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="dateOfBirth" className="flex items-center">
            <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />
            Date of Birth
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="dateOfBirth"
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !dateOfBirth && "text-muted-foreground"
                )}
              >
                <CalendarDays className="mr-2 h-4 w-4" />
                {dateOfBirth ? format(dateOfBirth, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={dateOfBirth}
                onSelect={(date) => { setDateOfBirth(date); setError(null); setAgeResult(null); }}
                captionLayout="dropdown-buttons"
                fromYear={1900}
                toYear={new Date().getFullYear()}
                initialFocus
                disabled={(date) => date > new Date()}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label htmlFor="asOfDate" className="flex items-center">
            <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />
            Calculate Age as of
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="asOfDate"
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !asOfDate && "text-muted-foreground"
                )}
              >
                <CalendarDays className="mr-2 h-4 w-4" />
                {asOfDate ? format(asOfDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={asOfDate}
                onSelect={(date) => { setAsOfDate(date); setError(null); setAgeResult(null); }}
                captionLayout="dropdown-buttons"
                fromYear={1900}
                toYear={new Date().getFullYear() + 100} // Allow future "as of" dates
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <Button onClick={handleCalculate} className="w-full sm:w-auto flex-grow">
          <Calculator className="mr-2 h-4 w-4" /> Calculate Age
        </Button>
        <Button onClick={handleClear} variant="outline" className="w-full sm:w-auto">
          <Eraser className="mr-2 h-4 w-4" /> Clear
        </Button>
      </div>

      {error && (
        <Card className="bg-destructive/10 border-destructive/50">
          <CardHeader className="py-2 px-3">
            <CardTitle className="flex items-center text-destructive text-sm">
              <AlertCircle className="mr-2 h-4 w-4" />Error
            </CardTitle>
          </CardHeader>
          <CardContent className="py-2 px-3">
            <p className="text-destructive text-sm">{error}</p>
          </CardContent>
        </Card>
      )}

      {ageResult && (
        <Card className="bg-accent/10 border-accent/50">
          <CardHeader className="py-3 px-4">
            <CardTitle className="flex items-center text-primary text-base">
              <UserCircle className="mr-2 h-5 w-5" /> Calculated Age
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-primary">{ageResult.summary || "0 days"}</p>
             <p className="text-xs text-muted-foreground mt-2">
                Date of Birth: {dateOfBirth ? format(dateOfBirth, "PPP") : "N/A"}
                <br />
                Age as of: {asOfDate ? format(asOfDate, "PPP") : "N/A"}
            </p>
          </CardContent>
        </Card>
      )}
       <Card className="bg-muted/30 mt-6">
        <CardHeader className="py-2 px-3">
          <CardTitle className="text-sm font-medium text-muted-foreground">How to use:</CardTitle>
        </CardHeader>
        <CardContent className="text-sm py-2 px-3 text-muted-foreground space-y-1">
            <p>Select your Date of Birth and the date for which you want to calculate the age (defaults to today). Click 'Calculate Age' to see the result in years, months, and days.</p>
        </CardContent>
      </Card>
    </div>
  );
}
