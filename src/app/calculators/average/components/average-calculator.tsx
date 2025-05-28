
"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AlertCircle, Calculator, PlusCircle, Trash2, ListChecks } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function AverageCalculator() {
  const [numbers, setNumbers] = useState<number[]>([]);
  const [currentInput, setCurrentInput] = useState<string>("");
  const [average, setAverage] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentInput(e.target.value);
    setError(null); // Clear error when user types
  };

  const handleAddNumber = () => {
    const num = parseFloat(currentInput);
    if (isNaN(num)) {
      setError("Please enter a valid number.");
      return;
    }
    setNumbers([...numbers, num]);
    setCurrentInput("");
    setAverage(null); // Clear previous average
    setError(null);
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleAddNumber();
  };
  
  const handleRemoveNumber = (indexToRemove: number) => {
    setNumbers(numbers.filter((_, index) => index !== indexToRemove));
    setAverage(null); // Clear previous average
    setError(null);
  };

  const handleCalculateAverage = () => {
    if (numbers.length === 0) {
      setError("Please add at least one number to calculate the average.");
      setAverage(null);
      return;
    }
    const sum = numbers.reduce((acc, curr) => acc + curr, 0);
    const avg = sum / numbers.length;
    setAverage(Number(avg.toFixed(5))); // Limit to 5 decimal places
    setError(null);
  };

  const handleClear = () => {
    setNumbers([]);
    setCurrentInput("");
    setAverage(null);
    setError(null);
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleFormSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="numberInput">Enter a number</Label>
          <div className="flex gap-2">
            <Input
              id="numberInput"
              type="number"
              step="any" // Allow decimals
              placeholder="e.g., 10 or 3.14"
              value={currentInput}
              onChange={handleInputChange}
              aria-label="Number input"
            />
            <Button type="submit" variant="outline" className="shrink-0">
              <PlusCircle className="mr-2 h-4 w-4" /> Add
            </Button>
          </div>
        </div>
      </form>

      {numbers.length > 0 && (
        <Card className="bg-muted/30">
          <CardHeader className="py-3 px-4">
            <CardTitle className="text-base flex items-center">
              <ListChecks className="mr-2 h-5 w-5 text-primary" />
              Numbers Added ({numbers.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-2">
              {numbers.map((num, index) => (
                <Badge key={index} variant="secondary" className="text-sm font-normal">
                  {num.toLocaleString()}
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-4 w-4 ml-1.5 opacity-50 hover:opacity-100"
                    onClick={() => handleRemoveNumber(index)}
                    aria-label={`Remove ${num}`}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      
      <div className="flex flex-col sm:flex-row gap-2">
        <Button onClick={handleCalculateAverage} className="w-full sm:w-auto flex-grow" disabled={numbers.length === 0}>
          <Calculator className="mr-2 h-4 w-4" /> Calculate Average
        </Button>
        <Button onClick={handleClear} variant="outline" className="w-full sm:w-auto">
          Clear All
        </Button>
      </div>

      {error && (
        <Card className="bg-destructive/10 border-destructive/50">
          <CardHeader className="py-3 px-4">
            <CardTitle className="flex items-center text-destructive text-base">
              <AlertCircle className="mr-2 h-5 w-5" /> Error
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-destructive">{error}</p>
          </CardContent>
        </Card>
      )}

      {average !== null && (
        <Card className="bg-accent/10 border-accent/50">
          <CardHeader className="py-3 px-4">
            <CardTitle className="flex items-center text-primary text-base">
              <Calculator className="mr-2 h-5 w-5" /> Result
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-lg font-semibold text-foreground">
              The average is: {average.toLocaleString()}
            </p>
             <p className="text-sm text-muted-foreground">
              Sum: {numbers.reduce((a, b) => a + b, 0).toLocaleString()} | Count: {numbers.length}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
