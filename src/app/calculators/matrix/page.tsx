"use client";
import dynamic from 'next/dynamic';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Grid3x3 } from "lucide-react";
// Metadata is now in layout.tsx

const MatrixCalculatorComponent = dynamic(() => import('./components/matrix-calculator').then(mod => mod.MatrixCalculator), {
  ssr: false,
  loading: () => <div className="flex justify-center items-center h-32"><p>Loading calculator...</p></div>
});

export default function MatrixCalculatorPage() {
  return (
    <div className="container mx-auto flex flex-col items-center">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-2 mb-2">
            <Grid3x3 className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl">Matrix Calculator</CardTitle>
          </div>
          <CardDescription>
            Perform basic matrix operations: Addition, Subtraction, and Multiplication. Define matrix dimensions and enter elements.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <MatrixCalculatorComponent />
        </CardContent>
      </Card>
       <Card className="w-full max-w-2xl shadow-lg mt-6 bg-muted/30">
        <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">How to use:</CardTitle>
        </CardHeader>
        <CardContent className="text-sm py-2 px-3 text-muted-foreground space-y-1">
            <p>1. Set the number of rows and columns for Matrix A and Matrix B (max 5x5).</p>
            <p>2. Enter the numeric elements for each matrix.</p>
            <p>3. Select the desired operation (Add, Subtract, Multiply).</p>
            <p>4. Click 'Calculate'. The result matrix or an error message will be displayed.</p>
            <p><strong>Note on operations:</strong></p>
            <ul className="list-disc pl-5">
                <li>Addition/Subtraction: Matrices must have the same dimensions.</li>
                <li>Multiplication (A * B): The number of columns in Matrix A must equal the number of rows in Matrix B.</li>
            </ul>
        </CardContent>
      </Card>
    </div>
  );
}
