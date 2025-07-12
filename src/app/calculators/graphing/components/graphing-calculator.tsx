
"use client";

import React, { useState } from "react"; // Added React
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Calculator, Eraser, LineChart as LineChartIcon } from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Line,
} from "recharts";

interface DataPoint {
  x: number;
  y: number | null; // Allow null for points where function is undefined
}

const chartConfig = {
  y: {
    label: "f(x)",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

function GraphingCalculatorComponent() {
  const [functionString, setFunctionString] = useState<string>("Math.sin(x)");
  const [xMin, setXMin] = useState<string>("-10");
  const [xMax, setXMax] = useState<string>("10");
  const [numPoints, setNumPoints] = useState<string>("200");
  const [dataPoints, setDataPoints] = useState<DataPoint[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handlePlot = () => {
    setError(null);
    setDataPoints([]);

    const min = parseFloat(xMin);
    const max = parseFloat(xMax);
    const points = parseInt(numPoints, 10);

    if (isNaN(min) || isNaN(max) || isNaN(points)) {
      setError("Please enter valid numeric values for x-range and number of points.");
      return;
    }
    if (min >= max) {
      setError("x-min must be less than x-max.");
      return;
    }
    if (points <= 1 || points > 10000) { // Limit points for performance/sanity
      setError("Number of points must be between 2 and 10000.");
      return;
    }
    if (functionString.trim() === "") {
      setError("Please enter a function to plot.");
      return;
    }

    const generatedPoints: DataPoint[] = [];
    const step = (max - min) / (points - 1);

    // Sanitize function string slightly: allow common math terms without 'Math.'
    // This is very basic and not a full parser.
    let safeFunctionString = functionString;
    const allowedMathFunctions = [
        'sin', 'cos', 'tan', 'asin', 'acos', 'atan', 'sqrt', 'log', 'log10', 'exp', 'pow', 'abs', 'PI', 'E'
    ];
    allowedMathFunctions.forEach(func => {
        const regex = new RegExp(`(?<!Math\\.)${func}(\\(|\\b)`, 'g');
        safeFunctionString = safeFunctionString.replace(regex, `Math.${func}$1`);
    });
    
    // Replace ^ with ** for exponentiation if not already done by user
    safeFunctionString = safeFunctionString.replace(/\^/g, '**');


    let compiledFunc: Function;
    try {
      // IMPORTANT: Using new Function() can be a security risk if the input is not controlled.
      // This is a simplified approach for a prototype. In a production app, a proper math parsing library is recommended.
      compiledFunc = new Function('x', `try { return ${safeFunctionString}; } catch(e) { return NaN; /* Or throw e to see specific math errors */ }`);
    } catch (e) {
      setError("Invalid function syntax. Check your expression.");
      console.error("Function compilation error:", e);
      return;
    }

    for (let i = 0; i < points; i++) {
      const xVal = min + i * step;
      let yVal: number | null = null;
      try {
        const result = compiledFunc(xVal);
        if (typeof result === 'number' && isFinite(result)) {
          yVal = result;
        } else {
          yVal = null; // Handle undefined results (e.g., log(-1), 1/0) by creating a gap in the line
        }
      } catch (e) {
        console.error(`Error evaluating function at x=${xVal}:`, e);
        yVal = null; // Error during evaluation for this point
      }
      generatedPoints.push({ x: parseFloat(xVal.toFixed(5)), y: yVal !== null ? parseFloat(yVal.toFixed(5)) : null });
    }
    setDataPoints(generatedPoints);
  };

  const handleClear = () => {
    setFunctionString("Math.sin(x)");
    setXMin("-10");
    setXMax("10");
    setNumPoints("200");
    setDataPoints([]);
    setError(null);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end">
        <div className="space-y-1.5 sm:col-span-2 md:col-span-4 lg:col-span-2">
          <Label htmlFor="functionString">Function f(x)</Label>
          <Input
            id="functionString"
            type="text"
            placeholder="e.g., Math.sin(x) or x**2"
            value={functionString}
            onChange={(e) => setFunctionString(e.target.value)}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="xMin">x-Min</Label>
          <Input id="xMin" type="number" value={xMin} onChange={(e) => setXMin(e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="xMax">x-Max</Label>
          <Input id="xMax" type="number" value={xMax} onChange={(e) => setXMax(e.target.value)} />
        </div>
        <div className="space-y-1.5 lg:col-start-3">
          <Label htmlFor="numPoints">Number of Points</Label>
          <Input id="numPoints" type="number" value={numPoints} onChange={(e) => setNumPoints(e.target.value)} />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <Button onClick={handlePlot} className="w-full sm:w-auto flex-grow">
          <LineChartIcon className="mr-2 h-4 w-4" /> Plot Function
        </Button>
        <Button onClick={handleClear} variant="outline" className="w-full sm:w-auto">
          <Eraser className="mr-2 h-4 w-4" /> Clear
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

      {dataPoints.length > 0 && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle className="text-lg">Graph of: {functionString}</CardTitle>
          </CardHeader>
          <CardContent className="h-[400px] w-full p-2"> {/* Ensure chart has dimensions */}
            <ChartContainer config={chartConfig} className="h-full w-full">
              <LineChart
                data={dataPoints}
                margin={{ top: 5, right: 20, left: -20, bottom: 5 }} // Adjusted left margin for YAxis labels
                accessibilityLayer // For better accessibility
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="x"
                  type="number"
                  domain={['dataMin', 'dataMax']}
                  tickFormatter={(tick) => tick.toLocaleString()}
                  allowDuplicatedCategory={false}
                  name="x"
                />
                <YAxis 
                  dataKey="y" 
                  type="number"
                  domain={['auto', 'auto']} // Auto domain for y-axis based on data
                  tickFormatter={(tick) => tick.toLocaleString()}
                  name="f(x)"
                  allowDataOverflow={true}
                />
                <ChartTooltip
                  cursor={true}
                  content={<ChartTooltipContent hideIndicator />}
                />
                <ChartLegend content={<ChartLegendContent />} />
                <Line
                  dataKey="y"
                  type="monotone" // or "linear"
                  stroke="var(--color-y)"
                  strokeWidth={2}
                  dot={false}
                  connectNulls={false} // Creates gaps where y is null
                  name="f(x)"
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
GraphingCalculatorComponent.displayName = "GraphingCalculatorComponent";
export const GraphingCalculator = React.memo(GraphingCalculatorComponent);
