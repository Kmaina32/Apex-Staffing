
'use server';

import { z } from 'zod';
import { updateSettings } from '@/lib/firebase-admin';
import { revalidatePath } from 'next/cache';

export interface FormState {
    message: string;
    errors: Record<string, string[] | undefined> | undefined;
}

const urlOrEmptyStringSchema = z.string().url().or(z.literal(''));

const settingsSchema = z.object({
  heroImage1: urlOrEmptyStringSchema,
  heroImage2: urlOrEmptyStringSchema,
  heroImage3: urlOrEmptyStringSchema,
  heroImage4: urlOrEmptyStringSchema,
});

export async function updateSettingsAction(prevState: FormState, formData: FormData): Promise<FormState> {

    const rawFormData = {
      heroImage1: formData.get('heroImage1'),
      heroImage2: formData.get('heroImage2'),
      heroImage3: formData.get('heroImage3'),
      heroImage4: formData.get('heroImage4'),
    };
    
    const validatedFields = settingsSchema.safeParse(rawFormData);

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Validation failed. Please check the URLs.',
        };
    }

    try {
        await updateSettings('landingPage', validatedFields.data);
        revalidatePath('/');
        return { message: 'success', errors: undefined };

    } catch (e) {
        console.error(e);
        return { message: 'error', errors: undefined };
    }
}
