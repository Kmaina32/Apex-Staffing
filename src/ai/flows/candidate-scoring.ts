// This file uses server-side code.
'use server';

/**
 * @fileOverview Scores candidates based on their fit for a job posting.
 *
 * - candidateScoring - A function that calculates a fit score between a candidate and a job posting.
 * - CandidateScoringInput - The input type for the candidateScoring function.
 * - CandidateScoringOutput - The return type for the candidateScoring function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CandidateScoringInputSchema = z.object({
  candidateProfile: z
    .string()
    .describe('The profile of the candidate, including skills, experience, and qualifications.'),
  jobDescription: z.string().describe('The description of the job posting.'),
});
export type CandidateScoringInput = z.infer<typeof CandidateScoringInputSchema>;

const CandidateScoringOutputSchema = z.object({
  fitScore: z
    .number()
    .describe(
      'A numerical score (0-100) indicating how well the candidate fits the job posting. Higher score means better fit.'
    ),
  rationale: z
    .string()
    .describe('A brief explanation of why the candidate received the given score.'),
});
export type CandidateScoringOutput = z.infer<typeof CandidateScoringOutputSchema>;

export async function candidateScoring(input: CandidateScoringInput): Promise<CandidateScoringOutput> {
  return candidateScoringFlow(input);
}

const prompt = ai.definePrompt({
  name: 'candidateScoringPrompt',
  input: {schema: CandidateScoringInputSchema},
  output: {schema: CandidateScoringOutputSchema},
  prompt: `You are an expert recruiter tasked with evaluating job candidate fit.

  Given the following candidate profile:
  {{candidateProfile}}

  And the following job description:
  {{jobDescription}}

  Assess how well the candidate matches the job requirements.
  Provide a fitScore between 0 and 100, where 100 represents a perfect match.
  Also, provide a rationale for the assigned score.
  Consider skills, experience, qualifications, and any other relevant information.

  Output should be structured as JSON.
  `,
});

const candidateScoringFlow = ai.defineFlow(
  {
    name: 'candidateScoringFlow',
    inputSchema: CandidateScoringInputSchema,
    outputSchema: CandidateScoringOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
