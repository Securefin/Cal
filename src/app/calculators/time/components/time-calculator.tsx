
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
import { AlertCircle, Calculator, Eraser, Clock, Minus, Plus } from "lucide-react";

type Operation = "add" | "subtract";

interface TimeInput {
  hours: string;
  minutes: string;
  seconds: string;
}

interface TimeResult {
  sign: string;
  hours: number;
  minutes: number;
  seconds: number;
}

export function TimeCalculator() {
  const [time1, setTime1] = useState<TimeInput>({ hours: "", minutes: "", seconds: "" });
  const [time2, setTime2] = useState<TimeInput>({ hours: "", minutes: "", seconds: "" });
  const [operation, setOperation] = useState<Operation>("add");
  const [result, setResult] = useState<TimeResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (
    timeSetter: React.Dispatch<React.SetStateAction<TimeInput>>,
    field: keyof TimeInput
  ) => (e: ChangeEvent<HTMLInputElement>) => {
    timeSetter((prev) => ({ ...prev, [field]: e.target.value }));
    setError(null);
    setResult(null);
  };

  const parseTimeToSeconds = (time: TimeInput): number | null => {
    const h = parseInt(time.hours, 10) || 0;
    const m = parseInt(time.minutes, 10) || 0;
    const s = parseInt(time.seconds, 10) || 0;

    if (isNaN(parseFloat(time.hours)) && time.hours !== "") return null;
    if (isNaN(parseFloat(time.minutes)) && time.minutes !== "") return null;
    if (isNaN(parseFloat(time.seconds)) && time.seconds !== "") return null;
    
    if (h < 0 || m < 0 || s < 0) return null; // Durations should be positive

    return h * 3600 + m * 60 + s;
  };

  const formatSecondsToTime = (totalSeconds: number): TimeResult => {
    const sign = totalSeconds < 0 ? "-" : "";
    let absSeconds = Math.abs(totalSeconds);

    const hours = Math.floor(absSeconds / 3600);
    absSeconds %= 3600;
    const minutes = Math.floor(absSeconds / 60);
    const seconds = absSeconds % 60;

    return { sign, hours, minutes, seconds };
  };

  const handleCalculate = () => {
    setError(null);
    setResult(null);

    const totalSeconds1 = parseTimeToSeconds(time1);
    const totalSeconds2 = parseTimeToSeconds(time2);

    if (totalSeconds1 === null || totalSeconds2 === null) {
      setError("Please enter valid, non-negative numbers for hours, minutes, and seconds.");
      return;
    }
    
    let resultInSeconds: number;
    if (operation === "add") {
      resultInSeconds = totalSeconds1 + totalSeconds2;
    } else { // subtract
      resultInSeconds = totalSeconds1 - totalSeconds2;
    }

    setResult(formatSecondsToTime(resultInSeconds));
  };

  const handleClear = () => {
    setTime1({ hours: "", minutes: "", seconds: "" });
    setTime2({ hours: "", minutes: "", seconds: "" });
    setOperation("add");
    setResult(null);
    setError(null);
  };

  const renderTimeInput = (
    label: string,
    timeState: TimeInput,
    timeSetter: React.Dispatch<React.SetStateAction<TimeInput>>
  ) => (
    <Card className="p-4">
      <CardHeader className="p-0 pb-2">
        <CardTitle className="text-md flex items-center"><Clock className="mr-2 h-4 w-4 text-muted-foreground"/>{label}</CardTitle>
      </CardHeader>
      <CardContent className="p-0 grid grid-cols-3 gap-2">
        <div>
          <Label htmlFor={`${label}-hours`} className="text-xs text-muted-foreground">Hours</Label>
          <Input
            id={`${label}-hours`}
            type="number"
            placeholder="H"
            value={timeState.hours}
            onChange={handleInputChange(timeSetter, "hours")}
            aria-label={`${label} hours`}
          />
        </div>
        <div>
          <Label htmlFor={`${label}-minutes`} className="text-xs text-muted-foreground">Minutes</Label>
          <Input
            id={`${label}-minutes`}
            type="number"
            placeholder="M"
            value={timeState.minutes}
            onChange={handleInputChange(timeSetter, "minutes")}
            aria-label={`${label} minutes`}
          />
        </div>
        <div>
          <Label htmlFor={`${label}-seconds`} className="text-xs text-muted-foreground">Seconds</Label>
          <Input
            id={`${label}-seconds`}
            type="number"
            placeholder="S"
            value={timeState.seconds}
            onChange={handleInputChange(timeSetter, "seconds")}
            aria-label={`${label} seconds`}
          />
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {renderTimeInput("First Duration", time1, setTime1)}

      <div className="flex justify-center">
        <Select value={operation} onValueChange={(val) => {setOperation(val as Operation); setResult(null);}}>
          <SelectTrigger className="w-[150px]" aria-label="Select operation">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="add"><Plus className="inline-block mr-2 h-4 w-4" /> Add</SelectItem>
            <SelectItem value="subtract"><Minus className="inline-block mr-2 h-4 w-4" /> Subtract</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {renderTimeInput("Second Duration", time2, setTime2)}

      <div className="flex flex-col sm:flex-row gap-2">
        <Button onClick={handleCalculate} className="w-full sm:w-auto flex-grow">
          <Calculator className="mr-2 h-4 w-4" /> Calculate
        </Button>
        <Button onClick={handleClear} variant="outline" className="w-full sm:w-auto">
          <Eraser className="mr-2 h-4 w-4" /> Clear All
        </Button>
      </div>

      {error && (
        <Card className="bg-destructive/10 border-destructive/50">
          <CardHeader className="py-2 px-3">
            <CardTitle className="flex items-center text-destructive text-sm">
              <AlertCircle className="mr-2 h-4 w-4" /> Error
            </CardTitle>
          </CardHeader>
          <CardContent className="py-2 px-3">
            <p className="text-destructive text-sm">{error}</p>
          </CardContent>
        </Card>
      )}

      {result && (
        <Card className="bg-accent/10 border-accent/50">
          <CardHeader className="py-3 px-4">
            <CardTitle className="flex items-center text-primary text-base">
              <Clock className="mr-2 h-5 w-5" /> Resulting Duration
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-2xl font-semibold text-primary">
              {result.sign} {result.hours}h {result.minutes}m {result.seconds}s
            </p>
          </CardContent>
        </Card>
      )}
      <Card className="bg-muted/30 mt-6">
        <CardHeader className="py-2 px-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">How to use:</CardTitle>
        </CardHeader>
        <CardContent className="text-sm py-2 px-3 text-muted-foreground space-y-1">
            <p>Enter the hours, minutes, and seconds for two time durations. Select an operation (Add or Subtract) and click 'Calculate'.</p>
            <p>For example, to add 1h 30m 0s and 0h 45m 30s, enter the values and select 'Add'.</p>
        </CardContent>
      </Card>
    </div>
  );
}
