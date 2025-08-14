
'use client';

import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, ShieldCheck, Briefcase, Users, FileText } from 'lucide-react';
import { ADMIN_USER_IDS } from '@/lib/admin';
import { AdminStatCard } from '@/components/admin/admin-stat-card';

export default function AdminPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const isAdmin = user ? ADMIN_USER_IDS.includes(user.uid) : false;

  useEffect(() => {
    // If not loading and the user is not an admin, redirect them.
    if (!loading && !isAdmin) {
      router.push('/dashboard');
    }
  }, [user, loading, isAdmin, router]);

  // Show a loading state while we verify the user
  if (loading || !isAdmin) {
    return (
      <div className="container mx-auto py-12 px-4 flex justify-center items-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  // If the user is an admin, show the admin dashboard
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
          value="125"
          icon={<Briefcase className="h-6 w-6 text-muted-foreground" />}
          description="+10 from last month"
        />
        <AdminStatCard 
          title="Total Candidates"
          value="2,350"
          icon={<Users className="h-6 w-6 text-muted-foreground" />}
          description="+150 from last month"
        />
        <AdminStatCard 
          title="Total Applications"
          value="4,875"
          icon={<FileText className="h-6 w-6 text-muted-foreground" />}
          description="+400 from last month"
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

