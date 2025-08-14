'use server';
/**
 * @fileOverview Parses a CV to extract structured information.
 *
 * - parseCv - A function that handles the CV parsing process.
 * - ParseCvInput - The input type for the parseCv function.
 * - ParseCvOutput - The return type for the parseCv function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ParseCvInputSchema = z.object({
  cvDataUri: z
    .string()
    .describe(
      "The CV document as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type ParseCvInput = z.infer<typeof ParseCvInputSchema>;

const ParseCvOutputSchema = z.object({
  name: z.string().describe('The full name of the candidate.'),
  nationality: z.string().describe('The nationality of the candidate.'),
  sector: z.string().describe('The desired job sector of the candidate.'),
  experience: z.string().describe('A summary of the candidate\'s work experience.'),
  preferredCountries: z.array(z.string()).describe('The preferred countries for work.'),
  visaReady: z.boolean().describe('Whether the candidate is ready for visa sponsorship.'),
  languages: z.array(z.string()).describe('The languages spoken by the candidate.'),
  education: z.string().describe('The education and qualifications of the candidate.'),
});
export type ParseCvOutput = z.infer<typeof ParseCvOutputSchema>;

export async function parseCv(input: ParseCvInput): Promise<ParseCvOutput> {
  return parseCvFlow(input);
}

const prompt = ai.definePrompt({
  name: 'parseCvPrompt',
  input: {schema: ParseCvInputSchema},
  output: {schema: ParseCvOutputSchema},
  prompt: `You are an expert CV parser, extracting information to fill a job application form.

  Analyze the following CV document and extract the relevant information to fill the fields below.  If a field cannot be determined, use NA.

  CV Document: {{media url=cvDataUri}}

  Output the data in JSON format.
  `,
});

const parseCvFlow = ai.defineFlow(
  {
    name: 'parseCvFlow',
    inputSchema: ParseCvInputSchema,
    outputSchema: ParseCvOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
