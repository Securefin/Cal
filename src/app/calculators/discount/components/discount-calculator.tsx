
"use client";

import { useState, useEffect, type ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, DollarSign, Percent, Eraser, Tags } from "lucide-react";

export function DiscountCalculator() {
  const [originalPrice, setOriginalPrice] = useState<string>("");
  const [discountPercentage, setDiscountPercentage] = useState<string>("");

  const [amountSaved, setAmountSaved] = useState<string | null>(null);
  const [finalPrice, setFinalPrice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const price = parseFloat(originalPrice);
    const discount = parseFloat(discountPercentage);

    if (originalPrice.trim() === "" && discountPercentage.trim() === "") {
      setError(null);
      setAmountSaved(null);
      setFinalPrice(null);
      return;
    }

    if (isNaN(price) || price < 0) {
      setError(originalPrice.trim() !== "" ? "Original price must be a non-negative number." : null);
      setAmountSaved(null);
      setFinalPrice(null);
      return;
    }

    if (isNaN(discount) || discount < 0) {
      setError(discountPercentage.trim() !== "" ? "Discount percentage must be a non-negative number." : null);
      setAmountSaved(null);
      setFinalPrice(null);
      return;
    }
    
    setError(null);

    const calculatedSavedAmount = price * (discount / 100);
    const calculatedFinalPrice = price - calculatedSavedAmount;

    if (!isFinite(calculatedSavedAmount) || !isFinite(calculatedFinalPrice)) {
        setError("Calculation resulted in an invalid number. Please check inputs.");
        setAmountSaved(null);
        setFinalPrice(null);
        return;
    }

    setAmountSaved(calculatedSavedAmount.toFixed(2));
    setFinalPrice(calculatedFinalPrice.toFixed(2));

  }, [originalPrice, discountPercentage]);

  const handleOriginalPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOriginalPrice(e.target.value);
  };

  const handleDiscountPercentageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDiscountPercentage(e.target.value);
  };
  
  const handleReset = () => {
    setOriginalPrice("");
    setDiscountPercentage("");
    setAmountSaved(null);
    setFinalPrice(null);
    setError(null);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="originalPrice" className="flex items-center">
            <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
            Original Price
          </Label>
          <Input
            id="originalPrice"
            type="number"
            step="any"
            placeholder="e.g., 100"
            value={originalPrice}
            onChange={handleOriginalPriceChange}
            aria-label="Original Price"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="discountPercentage" className="flex items-center">
            <Percent className="mr-2 h-4 w-4 text-muted-foreground" />
            Discount Percentage (%)
          </Label>
          <Input
            id="discountPercentage"
            type="number"
            step="any"
            placeholder="e.g., 20"
            value={discountPercentage}
            onChange={handleDiscountPercentageChange}
            aria-label="Discount Percentage"
          />
        </div>
      </div>
      
       <Button onClick={handleReset} variant="outline" className="w-full">
        <Eraser className="mr-2 h-4 w-4" /> Reset
      </Button>

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

      {finalPrice !== null && amountSaved !== null && !error && (
        <Card className="bg-accent/10 border-accent/50">
          <CardHeader className="py-3 px-4">
            <CardTitle className="flex items-center text-primary text-base">
                <Tags className="mr-2 h-5 w-5" />
                Discount Details
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            <div className="flex justify-between items-center">
              <p className="text-md text-foreground">Amount Saved:</p>
              <p className="text-lg font-medium text-primary/90">${amountSaved}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-md text-foreground">Final Price:</p>
              <p className="text-xl font-semibold text-primary">${finalPrice}</p>
            </div>
          </CardContent>
        </Card>
      )}
      <Card className="bg-muted/30 mt-6">
        <CardHeader className="py-2 px-3"><CardTitle className="text-sm font-medium text-muted-foreground">How to use:</CardTitle></CardHeader>
        <CardContent className="text-sm py-2 px-3 text-muted-foreground space-y-1">
            <p>Enter the original price of the item and the discount percentage. The calculator will automatically show you how much money you save and the final price you pay.</p>
        </CardContent>
      </Card>
    </div>
  );
}
