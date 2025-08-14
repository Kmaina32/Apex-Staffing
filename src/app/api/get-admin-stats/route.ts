
import { getJobs, getAllApplications } from '@/lib/firebase';
import { getUsers } from '@/lib/firebase-admin';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const jobsPromise = getJobs();
    const applicationsPromise = getAllApplications();
    const usersPromise = getUsers();

    const [jobs, applications, users] = await Promise.all([
      jobsPromise,
      applicationsPromise,
      usersPromise,
    ]);

    return NextResponse.json({
      totalJobs: jobs.length,
      totalApplications: applications.length,
      totalCandidates: users.length,
    });

  } catch (error) {
    console.error('API Error fetching admin stats:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
