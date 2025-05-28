
import dynamic from 'next/dynamic';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Flame } from "lucide-react";
import type { Metadata } from 'next';

const CalorieCalculator = dynamic(() => import('./components/calorie-calculator').then(mod => mod.CalorieCalculator), {
  ssr: false,
  loading: () => <div className="flex justify-center items-center h-32"><p>Loading calculator...</p></div>
});

export const metadata: Metadata = {
  title: 'Daily Calorie Calculator (TDEE) - CalcPro',
  description: 'Estimate your Total Daily Energy Expenditure (TDEE) based on BMR and activity level. Find maintenance calories and goals for weight management.',
};

export default function CalorieCalculatorPage() {
  return (
    <div className="container mx-auto flex flex-col items-center">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-2 mb-2">
            <Flame className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl">Daily Calorie Calculator (TDEE)</CardTitle>
          </div>
          <CardDescription>
            Estimate your Total Daily Energy Expenditure (TDEE) based on your BMR and activity level.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CalorieCalculator />
           <Card className="mt-6 bg-muted/30">
            <CardHeader className="py-2 px-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">What is TDEE?</CardTitle>
            </CardHeader>
            <CardContent className="text-sm py-2 px-3 text-muted-foreground space-y-1">
                <p>Your Total Daily Energy Expenditure (TDEE) is an estimation of how many calories you burn per day when exercise is taken into account. It is calculated by first figuring out your Basal Metabolic Rate (BMR), then multiplying that value by an activity multiplier.</p>
                <p className="text-xs">This calculator provides an estimate. For personalized health and nutrition advice, please consult a healthcare professional or registered dietitian.</p>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}
