
'use server';

import { autoFillApplication, type AutoFillApplicationOutput } from '@/ai/flows/auto-fill-application';
import { signUp } from '@/lib/auth';
import { z } from 'zod';


export interface FormState {
    data?: AutoFillApplicationOutput;
    error?: string;
    message?: string;
}

export interface AuthFormState {
    error?: string;
    message?: string;
}

const signUpSchema = z.object({
  fullName: z.string().min(2, { message: 'Full name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
});


export async function signUpAction(prevState: AuthFormState, formData: FormData): Promise<AuthFormState> {
    const validatedFields = signUpSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
        return {
            error: validatedFields.error.flatten().fieldErrors.password?.[0] || 
                   validatedFields.error.flatten().fieldErrors.email?.[0] ||
                   validatedFields.error.flatten().fieldErrors.fullName?.[0],
        };
    }

    try {
        await signUp(validatedFields.data.email, validatedFields.data.password);
        return { message: "Registration successful! Please log in." };
    } catch (e: any) {
        if (e.code === 'auth/email-already-in-use') {
            return { error: 'This email address is already in use.' };
        }
        return { error: 'An unknown error occurred. Please try again.' };
    }
}


export async function autoFillFromCV(prevState: FormState, formData: FormData): Promise<FormState> {
    const cvDataUri = formData.get('cvDataUri') as string;

    if (!cvDataUri || !cvDataUri.startsWith('data:')) {
        return { error: 'Invalid CV data. Please upload a valid file.' };
    }
    
    try {
        const applicationData = await autoFillApplication({
            cvDataUri,
            applicationFormFields: 'fullName, email, phone, workExperience, education, languages'
        });
        return { 
            data: applicationData,
            message: 'We have pre-filled the form with information from your CV.'
        };
    } catch (e) {
        console.error('AI CV Parsing Error:', e);
        return { error: 'Failed to parse CV. Please check the file and try again, or fill the form manually.' };
    }
}
