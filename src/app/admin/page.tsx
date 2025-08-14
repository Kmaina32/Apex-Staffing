
'use client';

import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, ShieldCheck, Briefcase, Users, FileText } from 'lucide-react';
import { ADMIN_USER_IDS } from '@/lib/admin';
import { AdminStatCard } from '@/components/admin/admin-stat-card';
import { getJobs, getAllApplications } from '@/lib/firebase';
import type { Job, Application } from '@/lib/types';
import { getUsers } from '@/lib/firebase-admin';
import type { UserRecord } from 'firebase-admin/auth';


export default function AdminPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [loadingData, setLoadingData] = useState(true);
  const [totalJobs, setTotalJobs] = useState(0);
  const [totalCandidates, setTotalCandidates] = useState(0);
  const [totalApplications, setTotalApplications] = useState(0);


  const isAdmin = user ? ADMIN_USER_IDS.includes(user.uid) : false;

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      router.push('/dashboard');
    }
  }, [user, authLoading, isAdmin, router]);

  useEffect(() => {
    async function fetchData() {
        if (isAdmin) {
            setLoadingData(true);
            const jobs = await getJobs();
            setTotalJobs(jobs.length);

            // This is a client-side call to a server action.
            // This is not ideal but works for this prototype.
            // In production, you might fetch this from an API route.
            const usersResponse = await fetch('/api/get-users');
            if(usersResponse.ok) {
                const users = await usersResponse.json();
                setTotalCandidates(users.length);
            }

            const applications = await getAllApplications();
            setTotalApplications(applications.length);
            
            setLoadingData(false);
        }
    }
    // We can't call the server action directly in useEffect.
    // A better approach is an API route or fetching inside a server component.
    // For now, let's just update jobs and applications
     async function fetchCounts() {
        if (isAdmin) {
            setLoadingData(true);
            const jobs = await getJobs();
            setTotalJobs(jobs.length);
            const applications = await getAllApplications();
            setTotalApplications(applications.length);
            setLoadingData(false);
        }
    }
    fetchCounts();
  }, [isAdmin]);

  if (authLoading || !isAdmin) {
    return (
      <div className="container mx-auto py-12 px-4 flex justify-center items-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4 max-w-7xl">
       <header className="mb-8 flex items-center gap-4">
            <ShieldCheck className="h-10 w-10 text-primary" />
            <div>
              <h1 className="text-3xl font-bold font-headline">Admin Dashboard</h1>
              <p className="text-muted-foreground">Welcome, admin! Manage your platform from here.</p>
            </div>
       </header>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <AdminStatCard 
          title="Total Job Listings"
          value={loadingData ? '...' : totalJobs.toString()}
          icon={<Briefcase className="h-6 w-6 text-muted-foreground" />}
        />
        <AdminStatCard 
          title="Total Candidates"
          value={loadingData ? '...' : totalCandidates.toString()}
          description="Real-time count disabled for prototype"
          icon={<Users className="h-6 w-6 text-muted-foreground" />}
        />
        <AdminStatCard 
          title="Total Applications"
          value={loadingData ? '...' : totalApplications.toString()}
          icon={<FileText className="h-6 w-6 text-muted-foreground" />}
        />
      </div>

       <Card>
        <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>An overview of recent platform events.</CardDescription>
        </CardHeader>
        <CardContent>
            {/* Placeholder for recent activity feed or charts */}
            <div className="text-center py-12 text-muted-foreground">
              <p>Recent activity and charts will be displayed here.</p>
            </div>
        </CardContent>
       </Card>
    </div>
  );
}
