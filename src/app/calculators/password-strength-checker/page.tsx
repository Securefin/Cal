
import { PasswordStrengthChecker } from "./components/password-strength-checker";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Password Strength Checker - CalcPro',
  description: 'Analyze the strength of your password in real-time. Get feedback on length, character types (uppercase, lowercase, numbers, symbols) and tips.',
};

export default function PasswordStrengthCheckerPage() {
  return (
    <div className="container mx-auto flex flex-col items-center">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-2 mb-2">
            <ShieldCheck className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl">Password Strength Checker</CardTitle>
          </div>
          <CardDescription>
            Analyze the strength of your password and get suggestions for improvement.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PasswordStrengthChecker />
        </CardContent>
      </Card>
    </div>
  );
}
