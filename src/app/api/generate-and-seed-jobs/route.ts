
import { NextResponse } from 'next/server';
import { generateJobs } from '@/ai/flows/generate-jobs';
import { addJob } from '@/lib/firebase-admin';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        console.log('Generating jobs with AI...');
        const jobs = await generateJobs();
        console.log(`AI generated ${jobs.length} jobs. Seeding to database...`);

        const results = await Promise.all(
            jobs.map(job => addJob(job))
        );
        
        console.log('Database seeded successfully.');
        return NextResponse.json({
            success: true,
            message: `Database seeded successfully with ${results.length} jobs!`,
            jobIds: results,
        });
    } catch (error: any) {
        console.error("Error in generate-and-seed-jobs route:", error);
        return NextResponse.json({ 
            success: false,
            message: "Error generating and seeding jobs.",
            error: error.message || 'An unknown server error occurred.'
        }, { status: 500 });
    }
}
