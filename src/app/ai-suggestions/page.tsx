
import { SuggestionForm } from "./components/suggestion-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Function Suggester - CalcPro',
  description: "Describe your calculation problem or what you're trying to achieve, and our AI will suggest a relevant function or formula.",
  openGraph: {
    title: 'AI Function Suggester - CalcPro',
    description: "Describe your calculation problem and get an AI-powered formula suggestion.",
    url: '/ai-suggestions',
    siteName: 'CalcPro',
    type: 'website',
  },
};

export default function AISuggestionsPage() {
  return (
    <div className="container mx-auto max-w-2xl">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-2 mb-2">
            <Lightbulb className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl">AI Function Suggester</CardTitle>
          </div>
          <CardDescription>
            Describe your calculation problem or what you're trying to achieve, and our AI will suggest a relevant function or formula.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SuggestionForm />
        </CardContent>
      </Card>
    </div>
  );
}
