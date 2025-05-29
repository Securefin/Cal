"use client"; // Ensures this page is a Client Component

import dynamic from 'next/dynamic';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";
// Metadata is now handled by layout.tsx

const PasswordStrengthCheckerComponent = dynamic(() => import('./components/password-strength-checker').then(mod => mod.PasswordStrengthChecker), {
  ssr: false, 
  loading: () => <div className="flex justify-center items-center h-32"><p>Loading calculator...</p></div>
});

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
          <PasswordStrengthCheckerComponent />
        </CardContent>
      </Card>
    </div>
  );
}
