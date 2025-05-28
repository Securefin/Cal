
import { BarcodeGenerator } from "./components/barcode-generator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScanLine } from "lucide-react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Barcode Generator (CODE128) - CalcPro',
  description: 'Generate CODE128 barcodes online. Enter alphanumeric data to create a scannable barcode image. Suitable for various labeling purposes.',
};

export default function BarcodeGeneratorPage() {
  return (
    <div className="container mx-auto flex flex-col items-center">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-2 mb-2">
            <ScanLine className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl">Barcode Generator (CODE128)</CardTitle>
          </div>
          <CardDescription>
            Enter data to generate a CODE128 barcode. This format supports alphanumeric characters.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <BarcodeGenerator />
        </CardContent>
      </Card>
       <Card className="w-full max-w-lg shadow-lg mt-6 bg-muted/30">
        <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">How to use:</CardTitle>
        </CardHeader>
        <CardContent className="text-sm py-2 px-3 text-muted-foreground space-y-1">
            <p>1. Enter the text or numbers you want to encode in the "Data" field.</p>
            <p>2. Click "Generate Barcode".</p>
            <p>3. The generated CODE128 barcode will appear below.</p>
            <p>This version generates CODE128 barcodes, which are commonly used for various labeling purposes.</p>
        </CardContent>
      </Card>
    </div>
  );
}
