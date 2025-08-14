
'use server';

import { z } from 'zod';
import { addJob } from '@/lib/firebase-admin';
import { revalidatePath } from 'next/cache';


export interface FormState {
    message: string;
    errors: Record<string, string[]> | undefined;
}

const jobSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters."),
  company: z.string().min(2, "Company name is required."),
  country: z.string().min(2, "Country is required."),
  countryCode: z.string().min(2, "Country code is required (e.g., 'de', 'ca')."),
  salary: z.string().min(3, "Salary information is required."),
  contractDuration: z.string().min(3, "Contract duration is required."),
  qualifications: z.string().min(10, "Please list some qualifications."),
  languageRequirements: z.string().min(3, "Language requirements are needed."),
  visaSponsored: z.boolean().default(false),
  description: z.string().min(20, "Description must be at least 20 characters."),
});

export async function createJobAction(prevState: FormState, formData: FormData): Promise<FormState> {

    const rawFormData = {
      title: formData.get('title'),
      company: formData.get('company'),
      country: formData.get('country'),
      countryCode: formData.get('countryCode'),
      salary: formData.get('salary'),
      contractDuration: formData.get('contractDuration'),
      qualifications: formData.get('qualifications'),
      languageRequirements: formData.get('languageRequirements'),
      visaSponsored: formData.get('visaSponsored') === 'on',
      description: formData.get('description'),
    };
    
    const validatedFields = jobSchema.safeParse(rawFormData);

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Validation failed. Please check the fields.',
        };
    }

    try {
        const data = validatedFields.data;
        await addJob({
            ...data,
            qualifications: data.qualifications.split(',').map(q => q.trim()),
            languageRequirements: data.languageRequirements.split(',').map(l => l.trim()),
        });
        
        revalidatePath('/admin/jobs');
        
        return { message: 'success', errors: undefined };

    } catch (e) {
        console.error(e);
        return { message: 'error', errors: undefined };
    }
}
