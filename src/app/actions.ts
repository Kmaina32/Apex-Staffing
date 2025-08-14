
'use server';

import { autoFillApplication, type AutoFillApplicationOutput } from '@/ai/flows/auto-fill-application';

export interface FormState {
    data?: AutoFillApplicationOutput;
    error?: string;
    message?: string;
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
