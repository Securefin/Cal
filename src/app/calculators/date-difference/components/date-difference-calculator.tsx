
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Calculator, Eraser, CalendarDays } from "lucide-react";
import { format, isValid, intervalToDuration, differenceInDays } from "date-fns";
import { cn } from "@/lib/utils";

interface DurationResult {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  summary: string;
}

export function DateDifferenceCalculator() {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const [durationResult, setDurationResult] = useState<DurationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculateDifference = () => {
    setError(null);
    setDurationResult(null);

    if (!startDate || !endDate) {
      setError("Please select both a Start Date and an End Date.");
      return;
    }

    if (!isValid(startDate) || !isValid(endDate)) {
      setError("One or both selected dates are not valid.");
      return;
    }
    
    let actualStartDate = startDate;
    let actualEndDate = endDate;
    let isNegativeDuration = false;

    if (startDate > endDate) {
      actualStartDate = endDate;
      actualEndDate = startDate;
      isNegativeDuration = true;
    }

    const duration = intervalToDuration({ start: actualStartDate, end: actualEndDate });
    const totalDays = differenceInDays(actualEndDate, actualStartDate);

    const summaryParts = [];
    if (duration.years && duration.years > 0) summaryParts.push(`${duration.years} year${duration.years > 1 ? 's' : ''}`);
    if (duration.months && duration.months > 0) summaryParts.push(`${duration.months} month${duration.months > 1 ? 's' : ''}`);
    if (duration.days && duration.days > 0) summaryParts.push(`${duration.days} day${duration.days > 1 ? 's' : ''}`);
    
    let summaryString = summaryParts.join(', ');
    if (summaryString === "" && totalDays === 0) { // Same day
        summaryString = "0 days (Same day)";
    } else if (summaryString === "") { // Should not happen if totalDays > 0
        summaryString = `${totalDays} day${totalDays !== 1 ? 's' : ''}`;
    }

    if (isNegativeDuration) {
        summaryString += " (Negative Duration)";
    }


    setDurationResult({
      years: duration.years || 0,
      months: duration.months || 0,
      days: duration.days || 0,
      totalDays: totalDays,
      summary: summaryString,
    });
  };

  const handleClear = () => {
    setStartDate(undefined);
    setEndDate(new Date());
    setDurationResult(null);
    setError(null);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="startDate" className="flex items-center">
            <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />
            Start Date
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="startDate"
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !startDate && "text-muted-foreground"
                )}
              >
                <CalendarDays className="mr-2 h-4 w-4" />
                {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={(date) => { setStartDate(date); setError(null); setDurationResult(null); }}
                captionLayout="dropdown-buttons"
                fromYear={1900}
                toYear={new Date().getFullYear() + 100}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label htmlFor="endDate" className="flex items-center">
            <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />
            End Date
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="endDate"
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !endDate && "text-muted-foreground"
                )}
              >
                <CalendarDays className="mr-2 h-4 w-4" />
                {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={(date) => { setEndDate(date); setError(null); setDurationResult(null); }}
                captionLayout="dropdown-buttons"
                fromYear={1900}
                toYear={new Date().getFullYear() + 100}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <Button onClick={calculateDifference} className="w-full sm:w-auto flex-grow">
          <Calculator className="mr-2 h-4 w-4" /> Calculate Difference
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

      {durationResult && (
        <Card className="bg-accent/10 border-accent/50">
          <CardHeader className="py-3 px-4">
            <CardTitle className="flex items-center text-primary text-base">
              <CalendarDays className="mr-2 h-5 w-5" /> Duration
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-2">
            <p className="text-2xl font-bold text-primary">{durationResult.summary}</p>
            <p className="text-md text-muted-foreground">
              (Total of {durationResult.totalDays} day{durationResult.totalDays !== 1 ? 's' : ''})
            </p>
             <p className="text-xs text-muted-foreground mt-2">
                From: {startDate ? format(startDate, "PPP") : "N/A"}
                <br />
                To: {endDate ? format(endDate, "PPP") : "N/A"}
            </p>
          </CardContent>
        </Card>
      )}
       <Card className="bg-muted/30 mt-6">
        <CardHeader className="py-2 px-3">
          <CardTitle className="text-sm font-medium text-muted-foreground">How to use:</CardTitle>
        </CardHeader>
        <CardContent className="text-sm py-2 px-3 text-muted-foreground space-y-1">
            <p>Select a Start Date and an End Date. Click 'Calculate Difference' to see the duration between them in years, months, and days, as well as the total number of days.</p>
        </CardContent>
      </Card>
    </div>
  );
}
