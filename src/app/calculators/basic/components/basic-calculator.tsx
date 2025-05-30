
"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function BasicCalculator() {
  const [displayValue, setDisplayValue] = useState("0");
  const [firstOperand, setFirstOperand] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);
  const { toast } = useToast();

  const handleDigitClick = (digit: string) => {
    if (waitingForSecondOperand) {
      setDisplayValue(digit);
      setWaitingForSecondOperand(false);
    } else {
      setDisplayValue(displayValue === "0" ? digit : displayValue + digit);
    }
  };

  const handleDecimalClick = () => {
    if (waitingForSecondOperand) {
      setDisplayValue("0.");
      setWaitingForSecondOperand(false);
      return;
    }
    if (!displayValue.includes(".")) {
      setDisplayValue(displayValue + ".");
    }
  };

  const handleOperatorClick = (nextOperator: string) => {
    const inputValue = parseFloat(displayValue);

    if (operator && waitingForSecondOperand) {
      setOperator(nextOperator);
      return;
    }

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = performCalculation();
      setDisplayValue(String(result));
      setFirstOperand(result);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  const performCalculation = () => {
    const inputValue = parseFloat(displayValue);
    if (firstOperand === null || operator === null) return inputValue;

    switch (operator) {
      case "+":
        return firstOperand + inputValue;
      case "-":
        return firstOperand - inputValue;
      case "*":
        return firstOperand * inputValue;
      case "/":
        if (inputValue === 0) {
          return NaN; // Handle division by zero
        }
        return firstOperand / inputValue;
      default:
        return inputValue;
    }
  };

  const handleEqualsClick = () => {
    if (operator && firstOperand !== null) {
      const result = performCalculation();
       if (isNaN(result)) {
        setDisplayValue("Error");
      } else {
        setDisplayValue(String(Number(result.toFixed(10)))); // Limit precision and remove trailing zeros
      }
      setFirstOperand(null);
      setOperator(null);
      setWaitingForSecondOperand(true); // Ready for new calculation
    }
  };

  const handleClearClick = () => {
    setDisplayValue("0");
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const handleSignChange = () => {
    const currentValue = parseFloat(displayValue);
    if (currentValue !== 0) {
      setDisplayValue(String(currentValue * -1));
    }
  };
  
  const handleBackspace = () => {
    if (waitingForSecondOperand) return; // Don't allow backspace on result of previous operation if new one hasn't started
    if (displayValue.length > 1 && displayValue !== "Error") {
      setDisplayValue(displayValue.slice(0, -1));
    } else {
      setDisplayValue("0");
    }
  };

  const handleCopy = () => {
    if (displayValue && displayValue !== "Error") {
      navigator.clipboard.writeText(displayValue).then(() => {
        toast({ title: "Result Copied!", description: `${displayValue} copied to clipboard.` });
      }).catch(err => {
        toast({ title: "Copy Failed", description: "Could not copy result.", variant: "destructive" });
        console.error("Failed to copy: ", err);
      });
    } else {
      toast({ title: "Nothing to Copy", description: "Display is empty or shows an error.", variant: "destructive"});
    }
  };


  const buttonLayout = useMemo(() => [
    { label: "AC", onClick: handleClearClick, className: "col-span-2 bg-destructive hover:bg-destructive/90" },
    { label: "DEL", onClick: handleBackspace, className: "bg-secondary hover:bg-secondary/80" },
    { label: "/", onClick: () => handleOperatorClick("/"), className: "bg-primary hover:bg-primary/90 text-primary-foreground" },
    { label: "7", onClick: () => handleDigitClick("7") },
    { label: "8", onClick: () => handleDigitClick("8") },
    { label: "9", onClick: () => handleDigitClick("9") },
    { label: "*", onClick: () => handleOperatorClick("*"), className: "bg-primary hover:bg-primary/90 text-primary-foreground" },
    { label: "4", onClick: () => handleDigitClick("4") },
    { label: "5", onClick: () => handleDigitClick("5") },
    { label: "6", onClick: () => handleDigitClick("6") },
    { label: "-", onClick: () => handleOperatorClick("-"), className: "bg-primary hover:bg-primary/90 text-primary-foreground" },
    { label: "1", onClick: () => handleDigitClick("1") },
    { label: "2", onClick: () => handleDigitClick("2") },
    { label: "3", onClick: () => handleDigitClick("3") },
    { label: "+", onClick: () => handleOperatorClick("+"), className: "bg-primary hover:bg-primary/90 text-primary-foreground" },
    { label: "+/-", onClick: handleSignChange },
    { label: "0", onClick: () => handleDigitClick("0") },
    { label: ".", onClick: handleDecimalClick },
    { label: "=", onClick: handleEqualsClick, className: "col-span-1 bg-primary hover:bg-primary/90 text-primary-foreground" },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  ], []); // Dependencies: handlers are stable due to useState setters


  return (
    <div className="space-y-4 p-4 bg-card rounded-lg shadow-md">
      <div className="relative">
        <Input
          type="text"
          value={displayValue}
          readOnly
          className="w-full h-16 text-4xl text-right font-mono bg-muted/50 border-border focus-visible:ring-primary pr-12" // Added pr-12 for copy button space
          aria-label="Calculator display"
        />
        <Button
          variant="ghost"
          size="icon"
          onClick={handleCopy}
          className="absolute right-1 top-1/2 -translate-y-1/2 h-10 w-10 text-muted-foreground hover:text-primary"
          aria-label="Copy result"
        >
          <Copy className="h-5 w-5" />
        </Button>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {buttonLayout.map((btn) => (
          <Button
            key={btn.label}
            onClick={btn.onClick}
            variant="outline"
            className={`h-16 text-xl ${btn.className || ""} hover:bg-accent focus:bg-accent active:bg-accent/80`}
          >
            {btn.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
