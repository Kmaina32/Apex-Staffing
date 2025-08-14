'use server';

/**
 * @fileOverview Automatically fills in application forms using data extracted from a CV.
 *
 * - autoFillApplication - A function that handles the autofilling process.
 * - AutoFillApplicationInput - The input type for the autoFillApplication function.
 * - AutoFillApplicationOutput - The return type for the autoFillApplication function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AutoFillApplicationInputSchema = z.object({
  cvDataUri: z
    .string()
    .describe(
      "A CV document, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  applicationFormFields: z
    .string()
    .describe("The application form fields that needs to be filled, separated by commas."),
});
export type AutoFillApplicationInput = z.infer<typeof AutoFillApplicationInputSchema>;

const AutoFillApplicationOutputSchema = z.record(z.string(), z.string()).describe('A map of application form fields to their autofilled values.');
export type AutoFillApplicationOutput = z.infer<typeof AutoFillApplicationOutputSchema>;

export async function autoFillApplication(input: AutoFillApplicationInput): Promise<AutoFillApplicationOutput> {
  return autoFillApplicationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'autoFillApplicationPrompt',
  input: {schema: AutoFillApplicationInputSchema},
  output: {schema: AutoFillApplicationOutputSchema},
  prompt: `You are an AI assistant specialized in extracting information from CVs to auto-fill job application forms.

  Instructions:
  1.  Analyze the CV provided.
  2.  Identify and extract relevant information to fill the required fields in the application form.
  3.  If a field cannot be confidently filled from the CV, leave it blank.
  4.  Output the application form fields and their corresponding values as a JSON object.
  5. Do not fill in fields that are not in the applicationFormFields input.

  CV: {{media url=cvDataUri}}

  Application Form Fields: {{{applicationFormFields}}}

  Output JSON:
  `,
});

const autoFillApplicationFlow = ai.defineFlow(
  {
    name: 'autoFillApplicationFlow',
    inputSchema: AutoFillApplicationInputSchema,
    outputSchema: AutoFillApplicationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
