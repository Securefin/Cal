"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { suggestFunction, type SuggestFunctionOutput } from "@/ai/flows/suggest-function";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Wand2, Terminal } from "lucide-react";

const formSchema = z.object({
  userInput: z.string().min(10, {
    message: "Please describe your problem in at least 10 characters.",
  }).max(500, {
    message: "Input cannot exceed 500 characters."
  }),
});

type SuggestionFormValues = z.infer<typeof formSchema>;

export function SuggestionForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<SuggestFunctionOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<SuggestionFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userInput: "",
    },
  });

  async function onSubmit(values: SuggestionFormValues) {
    setIsLoading(true);
    setSuggestion(null);
    setError(null);
    try {
      const result = await suggestFunction({ userInput: values.userInput });
      setSuggestion(result);
    } catch (e) {
      setError("Failed to get suggestion. Please try again.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="userInput"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="userInput" className="text-lg">Your Problem Description</FormLabel>
                <FormControl>
                  <Textarea
                    id="userInput"
                    placeholder="e.g., 'I need to calculate the monthly payment for a car loan' or 'How to find the area of a circle?'"
                    className="min-h-[100px] resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Getting Suggestion...
              </>
            ) : (
              <>
                <Wand2 className="mr-2 h-4 w-4" />
                Suggest Function
              </>
            )}
          </Button>
        </form>
      </Form>

      {error && (
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {suggestion && (
        <Card className="bg-accent/20 dark:bg-accent/10">
          <CardHeader>
            <CardTitle className="flex items-center text-xl text-primary">
              <Wand2 className="mr-2 h-6 w-6" />
              AI Suggestion
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg">Suggested Function/Formula:</h3>
              <p className="text-foreground/90 p-3 bg-muted rounded-md font-mono text-sm">
                {suggestion.suggestedFunction}
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Explanation:</h3>
              <p className="text-foreground/80 leading-relaxed">
                {suggestion.explanation}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
