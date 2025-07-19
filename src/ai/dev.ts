'use server';

import { config } from 'dotenv';
config();

import {ai} from '@/ai/genkit';
import {z} from 'zod';

export const suggestCalculator = ai.defineFlow(
  {
    name: 'suggestCalculator',
    inputSchema: z.string(),
    outputSchema: z.string(),
  },
  async (query) => {
    const {output} = await ai.generate({
      prompt: `Suggest a calculator for the following query: ${query}`,
      model: 'googleai/gemini-2.0-flash',
    });
    return output!;
  }
);
