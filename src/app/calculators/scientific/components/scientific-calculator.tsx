
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { SquareFunction, Sigma, Percent, Divide, X, Minus, Plus, Pi, Delete, Equal, Binary, HelpCircle } from "lucide-react"; // Simplified icons

// Helper function for factorial
const factorial = (n: number): number => {
  if (n < 0) return NaN; // Factorial is not defined for negative numbers
  if (n === 0 || n === 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
};

// Helper to safely evaluate expressions
// WARNING: This uses the Function constructor, which can be a security risk if not handled carefully.
// Ensure the expression string is built from trusted, sanitized inputs.
const evaluateExpression = (expression: string): number | string => {
  try {
    // Replace user-friendly symbols with Math equivalents
    let evalExpression = expression
      .replace(/π/g, "Math.PI")
      .replace(/e/g, "Math.E")
      .replace(/√\(/g, "Math.sqrt(")
      .replace(/ln\(/g, "Math.log(")
      .replace(/log\(/g, "Math.log10(")
      .replace(/\^/g, "**"); // Power operator

    // Handle percentage by converting 'X% of Y' or 'X%' scenarios
    // This is a simplified percentage handling. Robust % requires context (e.g., X% of Y, or Y + X%)
    // Here, we'll assume X% means X/100 if it's the last operation.
    if (evalExpression.endsWith('%')) {
      evalExpression = evalExpression.slice(0, -1) + '/100';
    } else {
      // More complex percentage logic would be needed here for "Y + X%"
      // For now, we'll handle it by ensuring the % operation can be calculated if it's part of a larger expression
      // Example: 50+10% should be 50 + (50 * 0.10) = 55
      // This requires more sophisticated parsing than this simple evaluate function can handle.
      // We will replace X% with (X/100) globally for now.
       evalExpression = evalExpression.replace(/(\d+)%/g, "($1/100)");
    }
    
    const result = new Function("return " + evalExpression)();
    if (typeof result === 'number' && !isNaN(result) && isFinite(result)) {
      // Limit precision to avoid long floating point numbers
      return Number(result.toFixed(10));
    }
    return "Error";
  } catch (error) {
    console.error("Evaluation Error:", error);
    return "Error";
  }
};


export function ScientificCalculator() {
  const [currentInput, setCurrentInput] = useState("0");
  const [expression, setExpression] = useState("");
  const [isRadianMode, setIsRadianMode] = useState(true);
  const [displayExpression, setDisplayExpression] = useState(""); // For showing user-friendly expression

  // Effect to update displayExpression whenever expression changes
  useEffect(() => {
    let friendlyExpression = expression;
    // More replacements can be added here if needed for display
    setDisplayExpression(friendlyExpression);
  }, [expression]);

  const handleDigitClick = (digit: string) => {
    if (currentInput === "Error") {
      setCurrentInput(digit);
      setExpression(digit);
      return;
    }
    setCurrentInput((prev) => (prev === "0" && digit !== "." ? digit : prev + digit));
    setExpression((prev) => prev + digit);
  };

  const handleDecimalClick = () => {
    if (!currentInput.includes(".")) {
      setCurrentInput((prev) => prev + ".");
      setExpression((prev) => prev + ".");
    }
  };

  const handleOperatorClick = (op: string) => {
    if (currentInput === "Error") return;
    // Avoid multiple operators in a row, or handle them gracefully
    const lastChar = expression.slice(-1);
    if (['+', '-', '*', '/', '^'].includes(lastChar) && ['+', '-', '*', '/', '^'].includes(op)) {
        // Replace last operator if another is pressed (except for allowing negative numbers)
        if (op === '-' && (lastChar === '*' || lastChar === '/')) {
            setExpression((prev) => prev + op);
        } else {
           setExpression((prev) => prev.slice(0, -1) + op);
        }
    } else {
        setExpression((prev) => prev + op);
    }
    setCurrentInput("0"); // Reset current input for next number
  };
  
  const handlePercentage = () => {
    if (currentInput === "Error" || currentInput === "0") return;
    // Append % to expression. Evaluation logic will handle it.
    setExpression(prev => prev + "%");
    // The result will be calculated on equals.
    // Optionally, if we want immediate calc:
    // const numericValue = parseFloat(currentInput);
    // if (!isNaN(numericValue)) {
    //   const percentVal = numericValue / 100;
    //   setCurrentInput(String(percentVal));
    //   setExpression(prev => prev.substring(0, prev.length - currentInput.length) + String(percentVal));
    // }
    setCurrentInput("0"); // Ready for next input or equals
  };


  const handleFunctionClick = (func: string) => {
    if (currentInput === "Error") return;
    const numericValue = parseFloat(currentInput);

    switch (func) {
      case "x²":
        setExpression((prev) => `(${prev})^2`);
        setCurrentInput("0");
        break;
      case "x³":
        setExpression((prev) => `(${prev})^3`);
        setCurrentInput("0");
        break;
      case "1/x":
        setExpression((prev) => `1/(${prev})`);
        setCurrentInput("0");
        break;
      case "√":
        setExpression((prev) => `√(${prev || currentInput})`); // Allow √ to operate on current input if expression is empty
        setCurrentInput("0");
        break;
      case "ln":
      case "log":
      case "sin":
      case "cos":
      case "tan":
        setExpression((prev) => prev + `${func}(`);
        setCurrentInput("0");
        break;
      case "x!":
        if (!isNaN(numericValue) && Number.isInteger(numericValue) && numericValue >= 0) {
          const factResult = factorial(numericValue);
          setExpression((prev) => prev.substring(0, prev.length - currentInput.length) + String(factResult));
          setCurrentInput(String(factResult));
        } else {
          setCurrentInput("Error");
          setExpression("Error");
        }
        break;
      default:
        setExpression((prev) => prev + func); // For functions like e^, 10^
        setCurrentInput("0");
    }
  };

  const handleConstantClick = (constant: string) => {
     if (currentInput !== "0" && !['+', '-', '*', '/', '(', '^'].includes(expression.slice(-1))) {
      // If there's a number typed and no operator before, multiply by the constant
      setExpression((prev) => prev + "*" + constant);
    } else {
      setExpression((prev) => prev + constant);
    }
    // Show the constant value in currentInput for clarity, but it's part of expression
    setCurrentInput(constant === "π" ? String(Math.PI.toFixed(7)) : String(Math.E.toFixed(7))); 
  };

  const handleParenthesisClick = (parenthesis: string) => {
    setExpression((prev) => prev + parenthesis);
    setCurrentInput("0");
  };
  
  const handleSignChange = () => {
    if (currentInput !== "0" && currentInput !== "Error") {
      const newCurrentInput = String(parseFloat(currentInput) * -1);
      // Need to replace the currentInput part in the expression string
      setExpression(prev => {
        if (prev.endsWith(currentInput)) {
          return prev.substring(0, prev.length - currentInput.length) + newCurrentInput;
        }
        // If currentInput is not at the end (e.g. after a function call), this needs more complex logic.
        // For simplicity, assume sign change applies to the last entered number.
        return prev + newCurrentInput; // This might not be ideal if expression is complex
      });
      setCurrentInput(newCurrentInput);
    } else if (expression.length > 0 && !['+', '-', '*', '/', '(', '^'].includes(expression.slice(-1))) {
      // Try to negate the last number in expression if currentInput is 0
      // This is complex; for now, we'll keep it simple: only negate currentInput
    }
  };


  const handleEqualsClick = () => {
    if (expression === "" || currentInput === "Error") return;
    
    let finalExpression = expression;
    // Handle trigonometric functions with degree/radian mode
    // This requires parsing the expression to find sin, cos, tan and their arguments
    // For simplicity, this example will evaluate assuming Radian mode for Math.sin etc.
    // A more robust solution would involve a proper parser.
    
    // If trig function is in Degrees mode, convert its argument to Radians for Math functions
    // Example: sin(30) in degree mode should be Math.sin(30 * Math.PI / 180)
    if (!isRadianMode) {
        finalExpression = finalExpression.replace(/(sin|cos|tan)\(([^)]+)\)/g, (match, func, angle) => {
            let angleValue = evaluateExpression(angle); // Evaluate the angle expression first
            if (typeof angleValue === 'number') {
                return `Math.${func}(${angleValue} * Math.PI / 180)`;
            }
            return match; // If angle can't be evaluated, keep original
        });
    } else {
         finalExpression = finalExpression.replace(/(sin|cos|tan)\(([^)]+)\)/g, (match, func, angle) => {
            return `Math.${func}(${angle})`;
        });
    }

    const result = evaluateExpression(finalExpression);
    setCurrentInput(String(result));
    setExpression(String(result === "Error" ? "" : result)); // Set expression to result for further calcs, or clear if error
    setDisplayExpression(finalExpression + " = " + result); // Show full calculation
  };

  const handleClearClick = () => {
    setCurrentInput("0");
    setExpression("");
    setDisplayExpression("");
  };

  const handleBackspace = () => {
    if (currentInput === "Error") {
      handleClearClick();
      return;
    }
    if (currentInput.length > 1 && currentInput !== "0") {
      const newCurrentInput = currentInput.slice(0, -1);
      setCurrentInput(newCurrentInput);
      setExpression(prev => prev.slice(0, - (currentInput.length - newCurrentInput.length) ));

    } else if (currentInput.length === 1 && currentInput !== "0") {
      setCurrentInput("0");
       setExpression(prev => prev.slice(0, -1));
    } else if (expression.length > 0) { // If currentInput is "0", backspace expression
      setExpression((prev) => prev.slice(0, -1));
      // Potentially try to reconstruct currentInput from expression if needed, or keep it "0"
    }
    // Ensure displayExpression updates correctly too
     setDisplayExpression(prev => prev.slice(0, -1));
  };


  const buttonLayout = [
    { label: isRadianMode ? "Rad" : "Deg", onClick: () => setIsRadianMode(!isRadianMode), className: "text-xs", isToggle: true },
    { label: "x²", onClick: () => handleFunctionClick("x²") },
    { label: "x³", onClick: () => handleFunctionClick("x³") },
    { label: "xʸ", onClick: () => handleOperatorClick("^") }, // Using ^ for power

    { label: "eˣ", onClick: () => { setExpression(prev => prev + "Math.E**("); setCurrentInput("0");} },
    { label: "10ˣ", onClick: () => { setExpression(prev => prev + "10**("); setCurrentInput("0");} },
    { label: "1/x", onClick: () => handleFunctionClick("1/x") },
    { label: "√", onClick: () => handleFunctionClick("√") },
    
    { label: "ln", onClick: () => handleFunctionClick("ln") }, // ln(
    { label: "log", onClick: () => handleFunctionClick("log") }, // log10(
    { label: "x!", onClick: () => handleFunctionClick("x!") },
    { label: "π", onClick: () => handleConstantClick("π") },

    { label: "sin", onClick: () => handleFunctionClick("sin") },
    { label: "cos", onClick: () => handleFunctionClick("cos") },
    { label: "tan", onClick: () => handleFunctionClick("tan") },
    { label: "%", onClick: handlePercentage, icon: Percent },

    { label: "AC", onClick: handleClearClick, className: "bg-destructive hover:bg-destructive/90" },
    { label: "(", onClick: () => handleParenthesisClick("(") },
    { label: ")", onClick: () => handleParenthesisClick(")") },
    { label: "/", onClick: () => handleOperatorClick("/"), icon: Divide, className: "bg-primary hover:bg-primary/90 text-primary-foreground" },

    { label: "7", onClick: () => handleDigitClick("7") },
    { label: "8", onClick: () => handleDigitClick("8") },
    { label: "9", onClick: () => handleDigitClick("9") },
    { label: "*", onClick: () => handleOperatorClick("*"), icon: X, className: "bg-primary hover:bg-primary/90 text-primary-foreground" },

    { label: "4", onClick: () => handleDigitClick("4") },
    { label: "5", onClick: () => handleDigitClick("5") },
    { label: "6", onClick: () => handleDigitClick("6") },
    { label: "-", onClick: () => handleOperatorClick("-"), icon: Minus, className: "bg-primary hover:bg-primary/90 text-primary-foreground" },

    { label: "1", onClick: () => handleDigitClick("1") },
    { label: "2", onClick: () => handleDigitClick("2") },
    { label: "3", onClick: () => handleDigitClick("3") },
    { label: "+", onClick: () => handleOperatorClick("+"), icon: Plus, className: "bg-primary hover:bg-primary/90 text-primary-foreground" },
    
    { label: "DEL", onClick: handleBackspace, className: "bg-secondary hover:bg-secondary/80 col-span-1" },
    { label: "0", onClick: () => handleDigitClick("0") },
    { label: ".", onClick: handleDecimalClick },
    { label: "=", onClick: handleEqualsClick, icon: Equal, className: "bg-primary hover:bg-primary/90 text-primary-foreground" },
  ];
  // Removed +/- for now as its interaction with expression string is complex. Can be re-added.

  return (
    <div className="space-y-3 p-2 bg-card rounded-lg shadow-md">
      <div className="space-y-1">
        <Input
          type="text"
          value={displayExpression || " "} // Show expression history, ensure it's not empty for layout
          readOnly
          className="w-full h-10 text-sm text-right font-mono bg-muted/30 border-border focus-visible:ring-primary text-muted-foreground"
          aria-label="Calculator expression display"
        />
        <Input
          type="text"
          value={currentInput}
          readOnly
          className="w-full h-16 text-4xl text-right font-mono bg-muted/50 border-border focus-visible:ring-primary"
          aria-label="Calculator current input and result display"
        />
      </div>
      
      <div className="grid grid-cols-4 gap-2">
        {buttonLayout.map((btn, index) => {
          const Icon = btn.icon;
          return (
            <Button
              key={btn.label + index}
              onClick={btn.onClick}
              variant={btn.isToggle ? (isRadianMode && btn.label === "Rad") || (!isRadianMode && btn.label === "Deg") ? "default" : "outline" : "outline"}
              className={`h-12 text-md sm:text-lg ${btn.className || ""} hover:bg-accent focus:bg-accent active:bg-accent/80`}
              aria-label={btn.label}
            >
              {Icon ? <Icon className="h-5 w-5 sm:h-6 sm:w-6" /> : btn.label}
            </Button>
          );
        })}
      </div>
       <div className="flex items-center space-x-2 pt-2 justify-center">
        <Label htmlFor="mode-switch" className="text-sm text-muted-foreground">
          Mode:
        </Label>
        <span className={`text-sm font-medium ${isRadianMode ? 'text-primary' : 'text-muted-foreground'}`}>Radian</span>
        <Switch
          id="mode-switch"
          checked={!isRadianMode} // Switch is ON for Degree mode
          onCheckedChange={() => setIsRadianMode(!isRadianMode)}
          aria-label="Toggle between Radian and Degree mode"
        />
        <span className={`text-sm font-medium ${!isRadianMode ? 'text-primary' : 'text-muted-foreground'}`}>Degree</span>
      </div>
    </div>
  );
}
