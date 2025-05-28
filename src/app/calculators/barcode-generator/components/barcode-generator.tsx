
"use client";

import { useState, useRef, useEffect } from "react";
import JsBarcode from "jsbarcode";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, RefreshCw, Eraser } from "lucide-react";

export function BarcodeGenerator() {
  const [data, setData] = useState<string>("");
  const [displayData, setDisplayData] = useState<string>(""); // Data to actually render
  const [error, setError] = useState<string | null>(null);
  const barcodeRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (displayData && barcodeRef.current) {
      try {
        JsBarcode(barcodeRef.current, displayData, {
          format: "CODE128",
          displayValue: true,
          fontSize: 16,
          margin: 10,
        });
        setError(null);
      } catch (e: any) {
        console.error("Barcode generation error:", e);
        setError("Failed to generate barcode: " + e.message);
        // Clear the SVG if generation failed
        if (barcodeRef.current) {
            barcodeRef.current.innerHTML = "";
        }
      }
    } else if (barcodeRef.current) {
        // Clear barcode if there's no data to display
        barcodeRef.current.innerHTML = "";
    }
  }, [displayData]);

  const handleGenerate = () => {
    if (data.trim() === "") {
      setError("Please enter data to encode.");
      setDisplayData("");
      return;
    }
    setError(null);
    setDisplayData(data);
  };

  const handleClear = () => {
    setData("");
    setDisplayData("");
    setError(null);
    if (barcodeRef.current) {
      barcodeRef.current.innerHTML = "";
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1.5">
        <Label htmlFor="barcodeData">Data to Encode</Label>
        <Input
          id="barcodeData"
          type="text"
          placeholder="Enter data for barcode"
          value={data}
          onChange={(e) => setData(e.target.value)}
          aria-label="Data to encode in barcode"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <Button onClick={handleGenerate} className="w-full sm:w-auto flex-grow">
          <RefreshCw className="mr-2 h-4 w-4" /> Generate Barcode
        </Button>
        <Button onClick={handleClear} variant="outline" className="w-full sm:w-auto">
          <Eraser className="mr-2 h-4 w-4" /> Clear
        </Button>
      </div>

      {error && (
        <Card className="bg-destructive/10 border-destructive/50">
          <CardHeader className="py-2 px-3">
            <CardTitle className="flex items-center text-destructive text-sm">
              <AlertCircle className="mr-2 h-4 w-4" /> Error
            </CardTitle>
          </CardHeader>
          <CardContent className="py-2 px-3">
            <p className="text-destructive text-sm">{error}</p>
          </CardContent>
        </Card>
      )}

      {displayData && !error && (
        <Card>
          <CardHeader className="py-3 px-4">
            <CardTitle className="text-primary text-base">Generated Barcode (CODE128)</CardTitle>
          </CardHeader>
          <CardContent className="p-4 flex justify-center items-center bg-white rounded-md">
            <svg ref={barcodeRef}></svg>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
