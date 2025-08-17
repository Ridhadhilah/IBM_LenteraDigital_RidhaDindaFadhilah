'use server';
/**
 * @fileOverview Detects potential instances of cyberbullying and hate speech using AI-powered natural language processing (NLP).
 *
 * - detectBullying - A function that handles the bullying detection process.
 * - DetectBullyingInput - The input type for the detectBullying function.
 * - DetectBullyingOutput - The return type for the detectBullying function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DetectBullyingInputSchema = z.object({
  text: z.string().describe('The text to analyze for bullying and hate speech.'),
});
export type DetectBullyingInput = z.infer<typeof DetectBullyingInputSchema>;

const DetectBullyingOutputSchema = z.object({
  isBullying: z.boolean().describe('Whether the text contains bullying or hate speech.'),
  reason: z.string().describe('The reason why the text is classified as bullying or hate speech.'),
});
export type DetectBullyingOutput = z.infer<typeof DetectBullyingOutputSchema>;

export async function detectBullying(input: DetectBullyingInput): Promise<DetectBullyingOutput> {
  return detectBullyingFlow(input);
}

const detectBullyingPrompt = ai.definePrompt({
  name: 'detectBullyingPrompt',
  input: {schema: DetectBullyingInputSchema},
  output: {schema: DetectBullyingOutputSchema},
  prompt: `You are a moderator for an online community. Your task is to detect cyberbullying and hate speech in the given text.

  Determine whether the following text constitutes bullying or hate speech. If it does, explain the reason why. Return a boolean value for isBullying and a string for reason.

  Text: {{{text}}}`,
});

const detectBullyingFlow = ai.defineFlow(
  {
    name: 'detectBullyingFlow',
    inputSchema: DetectBullyingInputSchema,
    outputSchema: DetectBullyingOutputSchema,
  },
  async input => {
    const {output} = await detectBullyingPrompt(input);
    return output!;
  }
);
