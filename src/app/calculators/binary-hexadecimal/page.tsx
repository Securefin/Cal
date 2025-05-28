
import dynamic from 'next/dynamic';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Binary } from "lucide-react";
import type { Metadata } from 'next';

const BinaryHexadecimalCalculator = dynamic(() => import('./components/binary-hexadecimal-calculator').then(mod => mod.BinaryHexadecimalCalculator), {
  ssr: false,
  loading: () => <div className="flex justify-center items-center h-32"><p>Loading calculator...</p></div>
});

export const metadata: Metadata = {
  title: 'Binary/Decimal/Hexadecimal Converter - CalcPro',
  description: 'Convert numbers between binary, decimal, and hexadecimal systems. Enter a value in one base to see its equivalents in others.',
};

export default function BinaryHexadecimalCalculatorPage() {
  return (
    <div className="container mx-auto flex flex-col items-center">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-2 mb-2">
            <Binary className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl">Binary/Hexadecimal/Decimal Converter</CardTitle>
          </div>
          <CardDescription>
            Convert numbers between binary, decimal, and hexadecimal systems. Enter a value in one field and select its base to see conversions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <BinaryHexadecimalCalculator />
        </CardContent>
      </Card>
       <Card className="w-full max-w-lg shadow-lg mt-6 bg-muted/30">
        <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">How to use:</CardTitle>
        </CardHeader>
        <CardContent className="text-sm py-2 px-3 text-muted-foreground space-y-1">
            <p>1. Enter a number in the "Input Value" field.</p>
            <p>2. Select the base of the number you entered (Binary, Decimal, or Hexadecimal) from the dropdown.</p>
            <p>3. The calculator will automatically display the converted values in all three bases.</p>
            <p><strong>Input Notes:</strong></p>
            <ul className="list-disc pl-5">
                <li>Binary numbers should only contain 0s and 1s (e.g., 101101).</li>
                <li>Decimal numbers are standard base-10 integers (e.g., 45).</li>
                <li>Hexadecimal numbers can contain 0-9 and A-F (case-insensitive, e.g., 2D or 1a3f). Do not use prefixes like '0x' or '0b'.</li>
            </ul>
        </CardContent>
      </Card>
    </div>
  );
}
