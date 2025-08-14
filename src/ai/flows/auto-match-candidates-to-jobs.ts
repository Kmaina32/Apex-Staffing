'use server';
/**
 * @fileOverview Automatically matches candidates to job postings based on skills and experience.
 *
 * - autoMatchCandidatesToJobs - A function that handles the candidate matching process.
 * - AutoMatchCandidatesToJobsInput - The input type for the autoMatchCandidatesToJobs function.
 * - AutoMatchCandidatesToJobsOutput - The return type for the autoMatchCandidatesToJobs function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AutoMatchCandidatesToJobsInputSchema = z.object({
  jobDescription: z.string().describe('The description of the job posting.'),
  candidateCVs: z
    .array(z.string())
    .describe(
      'An array of candidate CVs as strings. Each CV contains the candidate details, skills, and experience.'
    ),
});
export type AutoMatchCandidatesToJobsInput = z.infer<
  typeof AutoMatchCandidatesToJobsInputSchema
>;

const AutoMatchCandidatesToJobsOutputSchema = z.array(z.object({
  candidateIndex: z
    .number()
    .describe('The index of the candidate in the input array.'),
  matchScore: z
    .number()
    .describe('A score indicating how well the candidate matches the job.'),
  justification: z
    .string()
    .describe('The justification for the match score, explaining why the candidate is a good fit.'),
}));
export type AutoMatchCandidatesToJobsOutput = z.infer<
  typeof AutoMatchCandidatesToJobsOutputSchema
>;

export async function autoMatchCandidatesToJobs(
  input: AutoMatchCandidatesToJobsInput
): Promise<AutoMatchCandidatesToJobsOutput> {
  return autoMatchCandidatesToJobsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'autoMatchCandidatesToJobsPrompt',
  input: {schema: AutoMatchCandidatesToJobsInputSchema},
  output: {schema: AutoMatchCandidatesToJobsOutputSchema},
  prompt: `You are an expert recruiter, tasked with matching candidates to a job posting.

For each candidate CV provided, assess their suitability for the job based on their skills and experience, and give them a match score between 0 and 1 (0 being not a match, and 1 being a perfect match).
Also explain the score you assigned in the justification field. The array index of the candidate should also be emitted in the candidateIndex field.

Job Description: {{{jobDescription}}}

Candidate CVs:
{{#each candidateCVs}}
Index: {{@index}}
CV: {{{this}}}
{{/each}}`,
});

const autoMatchCandidatesToJobsFlow = ai.defineFlow(
  {
    name: 'autoMatchCandidatesToJobsFlow',
    inputSchema: AutoMatchCandidatesToJobsInputSchema,
    outputSchema: AutoMatchCandidatesToJobsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
