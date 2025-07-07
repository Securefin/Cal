
"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function BasicCalculatorComponent() {
  const [displayValue, setDisplayValue] = useState("0");
  const [firstOperand, setFirstOperand] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);
  const [expression, setExpression] = useState("");
  const { toast } = useToast();

  const handleDigitClick = (digit: string) => {
    if (expression.includes("=")) {
      setDisplayValue(digit);
      setExpression(digit);
      setFirstOperand(null);
      setOperator(null);
      setWaitingForSecondOperand(false);
      return;
    }

    if (waitingForSecondOperand) {
      setDisplayValue(digit);
      setExpression((prev) => prev + digit);
      setWaitingForSecondOperand(false);
    } else {
      const newDisplayValue = displayValue === "0" ? digit : displayValue + digit;
      setDisplayValue(newDisplayValue);
      // If expression was 0, replace it, otherwise append.
      if (expression === "0" && digit !== ".") {
          setExpression(digit);
      } else if (expression === "-0" && digit !== ".") {
          setExpression("-" + digit);
      }
      else {
          setExpression((prev) => prev + digit);
      }
    }
  };

  const handleDecimalClick = () => {
    if (expression.includes("=")) {
      setDisplayValue("0.");
      setExpression("0.");
      setFirstOperand(null);
      setOperator(null);
      setWaitingForSecondOperand(false);
      return;
    }

    if (waitingForSecondOperand) {
      setDisplayValue("0.");
      setExpression((prev) => prev + "0.");
      setWaitingForSecondOperand(false);
      return;
    }

    if (!displayValue.includes(".")) {
      setDisplayValue(displayValue + ".");
      setExpression((prev) => (prev === "" ? "0." : prev + "."));
    }
  };

  const performCalculation = (): number => {
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
        if (inputValue === 0) return NaN;
        return firstOperand / inputValue;
      default:
        return inputValue;
    }
  };

  const handleOperatorClick = (nextOperator: string) => {
    const inputValue = parseFloat(displayValue);

    if (expression.includes("=")) {
      setExpression(displayValue + ` ${nextOperator} `);
      setFirstOperand(inputValue);
      setOperator(nextOperator);
      setWaitingForSecondOperand(true);
      return;
    }

    if (operator && waitingForSecondOperand) {
      setOperator(nextOperator);
      setExpression((prev) => prev.trim().slice(0, -1).trim() + ` ${nextOperator} `);
      return;
    }

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = performCalculation();
      if (isNaN(result)) {
        setDisplayValue("Error");
        setExpression("Error");
        return;
      }
      const resultString = String(Number(result.toFixed(10)));
      setDisplayValue(resultString);
      setFirstOperand(result);
      setExpression(resultString);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
    setExpression((prev) => prev + ` ${nextOperator} `);
  };

  const handleEqualsClick = () => {
    if (!operator || firstOperand === null || waitingForSecondOperand) return;

    const result = performCalculation();
    if (isNaN(result)) {
      setDisplayValue("Error");
      setExpression("Error");
    } else {
      const resultString = String(Number(result.toFixed(10)));
      setDisplayValue(resultString);
      setExpression((prev) => prev + " =");
    }
    setFirstOperand(null);
    setWaitingForSecondOperand(true);
  };

  const handleClearClick = () => {
    setDisplayValue("0");
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
    setExpression("");
  };

  const handleSignChange = () => {
    if (displayValue === "Error" || waitingForSecondOperand) return;

    const newDisplayValue = String(parseFloat(displayValue) * -1);
    setDisplayValue(newDisplayValue);
    
    // Replace the tail of the expression that matches the old display value
    const currentDisplayNumber = parseFloat(displayValue);
    if (expression.endsWith(displayValue)) {
        setExpression(prev => prev.substring(0, prev.length - displayValue.length) + newDisplayValue);
    } else if (currentDisplayNumber === 0) {
        setExpression(prev => prev + "-");
    }
  };

  const handleBackspace = () => {
    if (waitingForSecondOperand || expression.includes("=") || displayValue === "Error") return;

    if (displayValue !== "0") {
      const newDisplayValue = displayValue.slice(0, -1) || "0";
      setDisplayValue(newDisplayValue);

      if (expression.endsWith(displayValue)) {
        setExpression(prev => prev.substring(0, prev.length - displayValue.length) + newDisplayValue);
      } else {
        setExpression(prev => prev.slice(0, -1));
      }
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

  const buttonLayout = [
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
  ];

  return (
    <div className="space-y-4 p-4 bg-card rounded-lg shadow-md">
       <div className="space-y-1">
        <Input
          type="text"
          value={expression || " "}
          readOnly
          className="w-full h-8 text-lg text-right font-mono bg-transparent border-none text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
          aria-label="Calculator expression"
        />
        <div className="relative">
          <Input
            type="text"
            value={displayValue}
            readOnly
            className="w-full h-16 text-4xl text-right font-mono bg-muted/50 border-border focus-visible:ring-primary pr-12"
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
BasicCalculatorComponent.displayName = "BasicCalculatorComponent";
export const BasicCalculator = React.memo(BasicCalculatorComponent);
