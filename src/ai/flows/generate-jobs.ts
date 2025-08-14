'use server';
/**
 * @fileOverview Generates a list of diverse and realistic job postings.
 *
 * - generateJobs - A function that handles the job generation process.
 * - GenerateJobsOutput - The return type for the generateJobs function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratedJobSchema = z.object({
  title: z.string().describe('The job title.'),
  company: z.string().describe('The name of the company hiring.'),
  country: z.string().describe('The country where the job is located.'),
  countryCode: z.string().describe('The 2-letter ISO code for the country (e.g., "de", "ca").'),
  salary: z.string().describe('The salary or salary range for the job.'),
  contractDuration: z.string().describe('The duration of the job contract (e.g., "Permanent", "2 years").'),
  qualifications: z.array(z.string()).describe('A list of required qualifications.'),
  languageRequirements: z.array(z.string()).describe('A list of required languages.'),
  visaSponsored: z.boolean().describe('Whether the company offers visa sponsorship.'),
  description: z.string().describe('A detailed description of the job role and responsibilities.'),
});

const GenerateJobsOutputSchema = z.array(GeneratedJobSchema);
export type GenerateJobsOutput = z.infer<typeof GenerateJobsOutputSchema>;

export async function generateJobs(): Promise<GenerateJobsOutput> {
  return generateJobsFlow();
}

const prompt = ai.definePrompt({
  name: 'generateJobsPrompt',
  output: {schema: GenerateJobsOutputSchema},
  prompt: `You are an expert in international recruitment. Your task is to generate a list of 10 diverse and realistic job postings for an international staffing agency.

Instructions:
1.  Create 10 distinct job listings.
2.  Cover a variety of industries, such as Healthcare, Technology, Construction, Engineering, and Hospitality.
3.  Include jobs from different countries around the world (e.g., Germany, Canada, UAE, Australia, Japan, UK).
4.  Ensure the details for each job (salary, qualifications, description) are plausible for the role and location.
5.  Set the 'visaSponsored' flag appropriately. High-skilled roles in-demand countries are more likely to offer sponsorship.
6.  The output must be a valid JSON array of job objects.
`,
});

const generateJobsFlow = ai.defineFlow(
  {
    name: 'generateJobsFlow',
    outputSchema: GenerateJobsOutputSchema,
  },
  async () => {
    const {output} = await prompt();
    return output!;
  }
);
