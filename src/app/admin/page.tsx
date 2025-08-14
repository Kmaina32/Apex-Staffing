
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldCheck, Briefcase, Users, FileText } from 'lucide-react';
import { AdminStatCard } from '@/components/admin/admin-stat-card';
import { getJobsCount, getUsersCount, getApplicationsCount } from '@/lib/firebase-admin';

// Note: This page is now a server component to securely fetch admin data.
// We can't use the useAuth hook here directly.
// In a real app, you'd protect this route using Next.js middleware or a similar pattern
// to verify admin privileges before rendering the page.
// For this prototype, we'll assume access is controlled and fetch the data directly.

export default async function AdminPage() {
  const [totalJobs, totalCandidates, totalApplications] = await Promise.all([
    getJobsCount(),
    getUsersCount(),
    getApplicationsCount(),
  ]);

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
