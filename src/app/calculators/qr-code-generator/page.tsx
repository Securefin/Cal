"use client";
import dynamic from 'next/dynamic';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { QrCode } from "lucide-react";
// Metadata is now in layout.tsx

const QrCodeGeneratorComponent = dynamic(() => import('./components/qr-code-generator').then(mod => mod.QrCodeGenerator), {
  ssr: false,
  loading: () => <div className="flex justify-center items-center h-32"><p>Loading calculator...</p></div>
});

export default function QrCodeGeneratorPage() {
  return (
    <div className="container mx-auto flex flex-col items-center">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-2 mb-2">
            <QrCode className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl">QR Code Generator</CardTitle>
          </div>
          <CardDescription>
            Enter text or a URL to generate a QR code. You can then download it as a PNG image.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <QrCodeGeneratorComponent />
        </CardContent>
      </Card>
       <Card className="w-full max-w-lg shadow-lg mt-6 bg-muted/30">
        <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">How to use:</CardTitle>
        </CardHeader>
        <CardContent className="text-sm py-2 px-3 text-muted-foreground space-y-1">
            <p>1. Enter the data (text, URL, etc.) you want to encode in the "Data" field.</p>
            <p>2. Adjust the desired size of the QR code using the slider.</p>
            <p>3. The QR code will update automatically.</p>
            <p>4. Click "Download QR Code" to save it as a PNG image.</p>
        </CardContent>
      </Card>
    </div>
  );
}
