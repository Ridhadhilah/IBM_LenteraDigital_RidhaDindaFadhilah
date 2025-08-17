'use server';

/**
 * @fileOverview Provides an AI chatbot for initial emotional support and guidance after reporting cyberbullying.
 *
 * - aiChatbotSupport - A function that provides support and guidance to users.
 * - AIChatbotSupportInput - The input type for the aiChatbotSupport function.
 * - AIChatbotSupportOutput - The return type for the aiChatbotSupport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIChatbotSupportInputSchema = z.object({
  reportText: z
    .string()
    .describe('The text of the cyberbullying report submitted by the user.'),
});
export type AIChatbotSupportInput = z.infer<typeof AIChatbotSupportInputSchema>;

const AIChatbotSupportOutputSchema = z.object({
  chatbotResponse: z
    .string()
    .describe(
      'The AI chatbot response providing initial emotional support and guidance, including recommendations for professional counseling.'
    ),
});
export type AIChatbotSupportOutput = z.infer<typeof AIChatbotSupportOutputSchema>;

export async function aiChatbotSupport(input: AIChatbotSupportInput): Promise<AIChatbotSupportOutput> {
  return aiChatbotSupportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiChatbotSupportPrompt',
  input: {schema: AIChatbotSupportInputSchema},
  output: {schema: AIChatbotSupportOutputSchema},
  prompt: `You are a supportive and empathetic AI chatbot designed to provide initial emotional support and guidance to users who have reported instances of cyberbullying.

  Based on the user's report, offer words of encouragement, validate their feelings, and provide practical advice on how to cope with the situation. Also, provide recommendations for professional counseling services or resources that can offer further assistance.

  Report Text: {{{reportText}}}
  `,
});

const aiChatbotSupportFlow = ai.defineFlow(
  {
    name: 'aiChatbotSupportFlow',
    inputSchema: AIChatbotSupportInputSchema,
    outputSchema: AIChatbotSupportOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
