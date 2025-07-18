"use client";
import dynamic from 'next/dynamic';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Spline } from "lucide-react";
// Metadata is now in layout.tsx

const GraphingCalculatorComponent = dynamic(() => import('./components/graphing-calculator').then(mod => mod.GraphingCalculator), {
  ssr: false,
  loading: () => <div className="flex justify-center items-center h-32"><p>Loading calculator...</p></div>
});

export default function GraphingCalculatorPage() {
  return (
    <div className="container mx-auto flex flex-col items-center">
      <Card className="w-full max-w-2xl shadow-lg"> {/* Increased width for graphing display */}
        <CardHeader>
          <div className="flex items-center space-x-2 mb-2">
            <Spline className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl">Graphing Calculator (Basic)</CardTitle>
          </div>
          <CardDescription>
            Plot mathematical functions. Enter a function using 'x' as the variable.
            Example: <code>Math.sin(x)</code>, <code>x*x</code>, <code>2*x - 1</code>.
            Use JavaScript's <code>Math</code> object for functions like <code>Math.cos()</code>, <code>Math.log()</code>, <code>Math.pow()</code>, etc.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <GraphingCalculatorComponent />
           <Card className="mt-6 bg-muted/30">
            <CardHeader className="py-2 px-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Important Notes:</CardTitle>
            </CardHeader>
            <CardContent className="text-sm py-2 px-3 text-muted-foreground space-y-1">
                <p>This is a basic graphing calculator. For more complex functions or features like multiple plots, zoom, or pan, more advanced tools may be required.</p>
                <p>Ensure your function is a valid JavaScript expression. For example, use <code>x**2</code> or <code>Math.pow(x,2)</code> for x squared, not <code>x^2</code>.</p>
                <p>Supported operations: +, -, *, /, ** (exponentiation). Supported Math functions: sin, cos, tan, asin, acos, atan, log (natural), log10, sqrt, abs, exp, pow, etc.</p>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}
