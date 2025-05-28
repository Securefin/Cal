
"use client";

import { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Eraser } from "lucide-react";

export function QrCodeGenerator() {
  const [data, setData] = useState<string>("https://firebase.google.com");
  const [size, setSize] = useState<number>(256);
  const [error, setError] = useState<string | null>(null);
  const qrRef = useRef<HTMLCanvasElement | null>(null); // Not strictly needed if using id for download

  const handleDataChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setData(event.target.value);
    setError(null);
  };

  const handleSizeChange = (value: number[]) => {
    setSize(value[0]);
  };

  const handleDownload = () => {
    const canvas = document.getElementById("qr-code-canvas") as HTMLCanvasElement;
    if (canvas) {
      try {
        const pngUrl = canvas
          .toDataURL("image/png")
          .replace("image/png", "image/octet-stream"); // Suggests download
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = "qrcode.png";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      } catch (e) {
        console.error("Failed to download QR code:", e);
        setError("Failed to download QR code. This might happen if the QR code is too complex or too large, or due to browser security settings for canvas operations.");
      }
    } else {
        setError("Could not find QR code canvas to download.");
    }
  };
  
  const handleClear = () => {
    setData("");
    setSize(256);
    setError(null);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1.5">
        <Label htmlFor="qrData">Data to Encode (URL, Text, etc.)</Label>
        <Textarea
          id="qrData"
          placeholder="Enter data for QR code"
          value={data}
          onChange={handleDataChange}
          className="min-h-[100px] resize-y"
          aria-label="Data to encode in QR code"
        />
      </div>

      <div className="space-y-3">
        <Label htmlFor="qrSize" className="flex justify-between">
          <span>QR Code Size:</span>
          <span className="text-primary font-semibold">{size}px</span>
        </Label>
        <Slider
          id="qrSize"
          min={64}
          max={1024}
          step={32}
          value={[size]}
          onValueChange={handleSizeChange}
          aria-label="QR code size slider"
        />
      </div>
      
      {error && (
        <Card className="bg-destructive/10 border-destructive/50">
          <CardHeader className="py-2 px-3"><CardTitle className="flex items-center text-destructive text-sm">Error</CardTitle></CardHeader>
          <CardContent className="py-2 px-3"><p className="text-destructive text-sm">{error}</p></CardContent>
        </Card>
      )}

      {data && !error && (
        <Card>
          <CardHeader className="py-3 px-4">
            <CardTitle className="text-primary text-base">Generated QR Code</CardTitle>
          </CardHeader>
          <CardContent className="p-4 flex justify-center items-center bg-white rounded-md">
            <QRCodeCanvas
              id="qr-code-canvas" // ID for download
              value={data}
              size={size}
              bgColor={"#ffffff"}
              fgColor={"#000000"}
              level={"L"} // Error correction level: L, M, Q, H
              includeMargin={true}
            />
          </CardContent>
        </Card>
      )}

      <div className="flex flex-col sm:flex-row gap-2">
         <Button onClick={handleDownload} disabled={!data || !!error} className="w-full sm:w-auto flex-grow">
          <Download className="mr-2 h-4 w-4" /> Download QR Code
        </Button>
        <Button onClick={handleClear} variant="outline" className="w-full sm:w-auto">
          <Eraser className="mr-2 h-4 w-4" /> Clear
        </Button>
      </div>
    </div>
  );
}
