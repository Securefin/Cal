'use server';
/**
 * @fileOverview An AI agent that suggests relevant functions or formulas based on user input.
 *
 * - suggestFunction - A function that handles the function suggestion process.
 * - SuggestFunctionInput - The input type for the suggestFunction function.
 * - SuggestFunctionOutput - The return type for the suggestFunction function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestFunctionInputSchema = z.object({
  userInput: z
    .string()
    .describe('The user input describing the calculation or problem.'),
});
export type SuggestFunctionInput = z.infer<typeof SuggestFunctionInputSchema>;

const SuggestFunctionOutputSchema = z.object({
  suggestedFunction: z
    .string()
    .describe('The AI suggested function or formula based on the user input.'),
  explanation: z
    .string()
    .describe('A brief explanation of why the function is relevant.'),
});
export type SuggestFunctionOutput = z.infer<typeof SuggestFunctionOutputSchema>;

export async function suggestFunction(input: SuggestFunctionInput): Promise<SuggestFunctionOutput> {
  return suggestFunctionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestFunctionPrompt',
  input: {schema: SuggestFunctionInputSchema},
  output: {schema: SuggestFunctionOutputSchema},
  prompt: `You are an AI assistant designed to suggest relevant functions or formulas based on user input.

  User Input: {{{userInput}}}

  Based on the user input, suggest a function or formula that would be helpful for the user. Also provide a brief explanation of why the function is relevant to the user input.  Your suggestion should be as precise as possible.
  `,
});

const suggestFunctionFlow = ai.defineFlow(
  {
    name: 'suggestFunctionFlow',
    inputSchema: SuggestFunctionInputSchema,
    outputSchema: SuggestFunctionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
