"use client";
import dynamic from 'next/dynamic';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { KeyRound } from "lucide-react";
// Metadata is now in layout.tsx

const PasswordGeneratorComponent = dynamic(() => import('./components/password-generator').then(mod => mod.PasswordGenerator), {
  ssr: false,
  loading: () => <div className="flex justify-center items-center h-32"><p>Loading calculator...</p></div>
});

export default function PasswordGeneratorPage() {
  return (
    <div className="container mx-auto flex flex-col items-center">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-2 mb-2">
            <KeyRound className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl">Password Generator</CardTitle>
          </div>
          <CardDescription>
            Create strong, random passwords based on your preferences.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PasswordGeneratorComponent />
        </CardContent>
      </Card>
       <Card className="w-full max-w-lg shadow-lg mt-6 bg-muted/30">
        <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">How to use:</CardTitle>
        </CardHeader>
        <CardContent className="text-sm py-2 px-3 text-muted-foreground space-y-1">
            <p>1. Adjust the desired password length using the slider.</p>
            <p>2. Select the character types to include (uppercase, lowercase, numbers, symbols).</p>
            <p>3. Click "Generate Password".</p>
            <p>4. Click the "Copy" button to copy the generated password to your clipboard.</p>
            <p className="font-semibold">Tip: For stronger passwords, use a mix of character types and a longer length.</p>
        </CardContent>
      </Card>
    </div>
  );
}
