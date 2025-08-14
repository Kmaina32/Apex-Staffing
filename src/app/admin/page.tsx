
'use client';

import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, ShieldCheck, Briefcase, Users, FileText } from 'lucide-react';
import { ADMIN_USER_IDS } from '@/lib/admin';
import { AdminStatCard } from '@/components/admin/admin-stat-card';
import { getJobs, getApplicationsForUser, getUsers } from '@/lib/firebase';
import type { Job, Application } from '@/lib/types';
import type { User } from 'firebase/auth';


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

            const users = await getUsers();
            setTotalCandidates(users.length);
            
            // In a real-world scenario with many applications, you'd want a more efficient way
            // to count them, like using a counter in Firestore updated with cloud functions.
            // For now, we'll fetch all applications. This might be slow if you have thousands.
            let appCount = 0;
            for(const u of users) {
                const apps = await getApplicationsForUser(u.uid);
                appCount += apps.length;
            }
            setTotalApplications(appCount);
            
            setLoadingData(false);
        }
    }
    fetchData();
  }, [isAdmin]);

  if (authLoading || !isAdmin || loadingData) {
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
          value={totalJobs.toString()}
          icon={<Briefcase className="h-6 w-6 text-muted-foreground" />}
        />
        <AdminStatCard 
          title="Total Candidates"
          value={totalCandidates.toString()}
          icon={<Users className="h-6 w-6 text-muted-foreground" />}
        />
        <AdminStatCard 
          title="Total Applications"
          value={totalApplications.toString()}
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
