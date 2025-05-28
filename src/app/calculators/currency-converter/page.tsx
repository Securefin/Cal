
import { CurrencyConverter } from "./components/currency-converter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Landmark } from "lucide-react";

export default function CurrencyConverterPage() {
  return (
    <div className="container mx-auto flex flex-col items-center">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-2 mb-2">
            <Landmark className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl">Currency Converter (Demo)</CardTitle>
          </div>
          <CardDescription>
            Convert between major currencies. 
            <strong className="text-destructive/80 dark:text-destructive/70"> Note: Uses fixed sample exchange rates, not live data. For demonstration purposes only.</strong>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CurrencyConverter />
        </CardContent>
      </Card>
       <Card className="w-full max-w-lg shadow-lg mt-6 bg-muted/30">
        <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">How to use:</CardTitle>
        </CardHeader>
        <CardContent className="text-sm py-2 px-3 text-muted-foreground space-y-1">
            <p>1. Enter the amount you want to convert.</p>
            <p>2. Select the currency you are converting from.</p>
            <p>3. Select the currency you want to convert to.</p>
            <p>4. The converted amount will be displayed automatically.</p>
            <p className="font-semibold">Disclaimer: The exchange rates used in this calculator are fixed and for demonstration only. They do not reflect live market rates.</p>
        </CardContent>
      </Card>
    </div>
  );
}
