"use client";
import dynamic from 'next/dynamic';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wand2 } from "lucide-react";
// Metadata is now in layout.tsx

const MathFormulaSolverComponent = dynamic(() => import('./components/math-formula-solver').then(mod => mod.MathFormulaSolver), {
  ssr: false,
  loading: () => <div className="flex justify-center items-center h-32"><p>Loading calculator...</p></div>
});

export default function MathFormulaSolverPage() {
  return (
    <div className="container mx-auto max-w-2xl">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-2 mb-2">
            <Wand2 className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl">AI Math Formula Solver</CardTitle>
          </div>
          <CardDescription>
            Describe your math problem or what you need a formula for, and our AI will suggest relevant formulas and explain them.
            For example: "area of a circle" or "how to calculate compound interest".
          </CardDescription>
        </CardHeader>
        <CardContent>
          <MathFormulaSolverComponent />
        </CardContent>
      </Card>
    </div>
  );
}
