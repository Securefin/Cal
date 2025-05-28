
import { GstCalculator } from "./components/gst-calculator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ReceiptText } from "lucide-react";

export default function GstCalculatorPage() {
  return (
    <div className="container mx-auto flex flex-col items-center">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-2 mb-2">
            <ReceiptText className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl">GST Calculator</CardTitle>
          </div>
          <CardDescription>
            Calculate Goods and Services Tax (GST) by adding or removing it from an amount.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <GstCalculator />
        </CardContent>
      </Card>
    </div>
  );
}
