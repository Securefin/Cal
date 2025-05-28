
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Copy, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
const numberChars = "0123456789";
const symbolChars = "!@#$%^&*()_+-=[]{}|;:,.<>/?~";

export function PasswordGenerator() {
  const [passwordLength, setPasswordLength] = useState<number>(16);
  const [includeUppercase, setIncludeUppercase] = useState<boolean>(true);
  const [includeLowercase, setIncludeLowercase] = useState<boolean>(true);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(true);
  const [generatedPassword, setGeneratedPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleGeneratePassword = () => {
    setError(null);
    setGeneratedPassword("");

    if (!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols) {
      setError("Please select at least one character type.");
      return;
    }

    let characterPool = "";
    if (includeUppercase) characterPool += uppercaseChars;
    if (includeLowercase) characterPool += lowercaseChars;
    if (includeNumbers) characterPool += numberChars;
    if (includeSymbols) characterPool += symbolChars;

    let newPassword = "";
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * characterPool.length);
      newPassword += characterPool[randomIndex];
    }
    setGeneratedPassword(newPassword);
  };

  const handleCopyToClipboard = () => {
    if (!generatedPassword) {
      toast({
        title: "Nothing to copy",
        description: "Please generate a password first.",
        variant: "destructive",
      });
      return;
    }
    navigator.clipboard.writeText(generatedPassword)
      .then(() => {
        toast({
          title: "Password Copied!",
          description: "The generated password has been copied to your clipboard.",
        });
      })
      .catch(err => {
        console.error("Failed to copy password: ", err);
        toast({
          title: "Copy Failed",
          description: "Could not copy password to clipboard. Please try again.",
          variant: "destructive",
        });
      });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label htmlFor="passwordLength" className="flex justify-between">
          <span>Password Length:</span>
          <span className="text-primary font-semibold">{passwordLength}</span>
        </Label>
        <Slider
          id="passwordLength"
          min={8}
          max={128}
          step={1}
          value={[passwordLength]}
          onValueChange={(value) => setPasswordLength(value[0])}
          aria-label="Password length slider"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="includeUppercase"
            checked={includeUppercase}
            onCheckedChange={(checked) => setIncludeUppercase(Boolean(checked))}
          />
          <Label htmlFor="includeUppercase" className="font-normal">Include Uppercase (A-Z)</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="includeLowercase"
            checked={includeLowercase}
            onCheckedChange={(checked) => setIncludeLowercase(Boolean(checked))}
          />
          <Label htmlFor="includeLowercase" className="font-normal">Include Lowercase (a-z)</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="includeNumbers"
            checked={includeNumbers}
            onCheckedChange={(checked) => setIncludeNumbers(Boolean(checked))}
          />
          <Label htmlFor="includeNumbers" className="font-normal">Include Numbers (0-9)</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="includeSymbols"
            checked={includeSymbols}
            onCheckedChange={(checked) => setIncludeSymbols(Boolean(checked))}
          />
          <Label htmlFor="includeSymbols" className="font-normal">Include Symbols (!@#...)</Label>
        </div>
      </div>

      <Button onClick={handleGeneratePassword} className="w-full">
        <RefreshCw className="mr-2 h-4 w-4" /> Generate Password
      </Button>

      {error && (
        <Card className="bg-destructive/10 border-destructive/50">
          <CardHeader className="py-2 px-3"><CardTitle className="flex items-center text-destructive text-sm"><AlertCircle className="mr-2 h-4 w-4" />Error</CardTitle></CardHeader>
          <CardContent className="py-2 px-3"><p className="text-destructive text-sm">{error}</p></CardContent>
        </Card>
      )}

      {generatedPassword && (
        <div className="space-y-2">
          <Label>Generated Password</Label>
          <div className="flex gap-2">
            <Input
              type="text"
              value={generatedPassword}
              readOnly
              className="font-mono text-sm tracking-wider"
              aria-label="Generated password"
            />
            <Button variant="outline" size="icon" onClick={handleCopyToClipboard} aria-label="Copy password">
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
