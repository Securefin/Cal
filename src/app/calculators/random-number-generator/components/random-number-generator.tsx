
"use client";

import { useState, type ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Shuffle, Eraser, PlusCircle, List } from "lucide-react";

export function RandomNumberGenerator() {
  const [minVal, setMinVal] = useState<string>("1");
  const [maxVal, setMaxVal] = useState<string>("100");
  const [count, setCount] = useState<string>("1");
  const [results, setResults] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
      setError(null);
      // Optionally clear results on input change, or let Generate button handle it
      // setResults([]); 
    };

  const handleGenerate = () => {
    setError(null);
    setResults([]);

    const min = parseInt(minVal, 10);
    const max = parseInt(maxVal, 10);
    const numCount = parseInt(count, 10);

    if (isNaN(min) || !Number.isInteger(parseFloat(minVal))) {
      setError("Minimum value must be a valid integer.");
      return;
    }
    if (isNaN(max) || !Number.isInteger(parseFloat(maxVal))) {
      setError("Maximum value must be a valid integer.");
      return;
    }
    if (isNaN(numCount) || numCount <= 0 || !Number.isInteger(parseFloat(count))) {
      setError("Number of results to generate must be a positive integer.");
      return;
    }
    if (min > max) {
      setError("Minimum value cannot be greater than maximum value.");
      return;
    }
     if (numCount > 1000) { // Practical limit
      setError("Cannot generate more than 1000 numbers at a time.");
      return;
    }


    const generatedNumbers: number[] = [];
    for (let i = 0; i < numCount; i++) {
      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      generatedNumbers.push(randomNumber);
    }
    setResults(generatedNumbers);
  };

  const handleClear = () => {
    setMinVal("1");
    setMaxVal("100");
    setCount("1");
    setResults([]);
    setError(null);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="minVal">Minimum Value</Label>
          <Input
            id="minVal"
            type="number"
            placeholder="e.g., 1"
            value={minVal}
            onChange={handleInputChange(setMinVal)}
            aria-label="Minimum value for random number generation"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="maxVal">Maximum Value</Label>
          <Input
            id="maxVal"
            type="number"
            placeholder="e.g., 100"
            value={maxVal}
            onChange={handleInputChange(setMaxVal)}
            aria-label="Maximum value for random number generation"
          />
        </div>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="count">Number of Random Numbers to Generate</Label>
        <Input
          id="count"
          type="number"
          min="1"
          placeholder="e.g., 1"
          value={count}
          onChange={handleInputChange(setCount)}
          aria-label="Number of random numbers to generate"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <Button onClick={handleGenerate} className="w-full sm:w-auto flex-grow">
          <Shuffle className="mr-2 h-4 w-4" /> Generate
        </Button>
        <Button onClick={handleClear} variant="outline" className="w-full sm:w-auto">
          <Eraser className="mr-2 h-4 w-4" /> Clear Inputs
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

      {results.length > 0 && (
        <Card className="bg-accent/10 border-accent/50">
          <CardHeader className="py-3 px-4">
            <CardTitle className="flex items-center text-primary text-base">
              <List className="mr-2 h-5 w-5" /> Generated Numbers
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-2">
                {results.map((num, index) => (
                    <span key={index} className="px-2 py-1 bg-primary/10 text-primary rounded-md font-mono text-sm">
                        {num.toLocaleString()}
                    </span>
                ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
