
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Calculator, Eraser, CalendarDays, CalendarCheck } from "lucide-react";
import { addDays, format, isValid } from "date-fns";
import { cn } from "@/lib/utils";

export function PregnancyDueDateCalculator() {
  const [lmpDate, setLmpDate] = useState<Date | undefined>(undefined);
  const [estimatedDueDate, setEstimatedDueDate] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    setError(null);
    setEstimatedDueDate(null);

    if (!lmpDate) {
      setError("Please select the first day of your last menstrual period (LMP).");
      return;
    }

    if (!isValid(lmpDate)) {
      setError("The selected LMP date is not valid.");
      return;
    }

    const edd = addDays(lmpDate, 280); // Naegele's rule: LMP + 280 days
    setEstimatedDueDate(format(edd, "PPP")); // Format as 'MMM d, yyyy' e.g., Jun 21, 2024
  };

  const handleClear = () => {
    setLmpDate(undefined);
    setEstimatedDueDate(null);
    setError(null);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="lmpDate" className="flex items-center">
          <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />
          First Day of Last Menstrual Period (LMP)
        </Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="lmpDate"
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !lmpDate && "text-muted-foreground"
              )}
            >
              <CalendarDays className="mr-2 h-4 w-4" />
              {lmpDate ? format(lmpDate, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={lmpDate}
              onSelect={(date) => {
                setLmpDate(date);
                setError(null);
                setEstimatedDueDate(null);
              }}
              initialFocus
              disabled={(date) =>
                date > new Date() || date < new Date("1900-01-01")
              }
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <Button onClick={handleCalculate} className="w-full sm:w-auto flex-grow">
          <Calculator className="mr-2 h-4 w-4" /> Calculate Due Date
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

      {estimatedDueDate && (
        <Card className="bg-accent/10 border-accent/50">
          <CardHeader className="py-3 px-4">
            <CardTitle className="flex items-center text-primary text-base">
              <CalendarCheck className="mr-2 h-5 w-5" /> Estimated Due Date (EDD)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-primary">{estimatedDueDate}</p>
            <p className="text-xs text-muted-foreground mt-1">
              This is an estimate. Actual delivery dates can vary. Consult your healthcare provider.
            </p>
          </CardContent>
        </Card>
      )}
       <Card className="bg-muted/30 mt-6">
        <CardHeader className="py-2 px-3">
          <CardTitle className="text-sm font-medium text-muted-foreground">How to use:</CardTitle>
        </CardHeader>
        <CardContent className="text-sm py-2 px-3 text-muted-foreground space-y-1">
            <p>Select the first day of your last menstrual period (LMP) using the date picker. Click 'Calculate Due Date' to get an estimation of your baby's due date.</p>
            <p className="text-xs">This calculator uses Naegele's rule (LMP + 280 days). It's an estimate and should be confirmed by a healthcare professional.</p>
        </CardContent>
      </Card>
    </div>
  );
}
