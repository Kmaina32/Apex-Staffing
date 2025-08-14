
'use client';

import { useAuth } from '@/hooks/use-auth';
import { getApplicationsForUser } from '@/lib/firebase';
import type { Application } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { User } from 'lucide-react';

function getStatusBadgeVariant(status: Application['status']) {
  switch (status) {
    case 'Offer Made':
      return 'default';
    case 'Shortlisted':
    case 'Interview Scheduled':
      return 'default';
    case 'Submitted':
    case 'Under Review':
      return 'secondary';
    case 'Rejected':
      return 'destructive';
    default:
      return 'outline';
  }
}

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    } else if (user) {
      getApplicationsForUser(user.uid).then(setApplications);
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-8 flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-bold font-headline">Welcome, {user.displayName || 'User'}!</h1>
            <p className="text-muted-foreground">Track your job applications and manage your profile.</p>
        </div>
        <Button asChild variant="outline">
            <Link href="/profile">
                <User className="mr-2 h-4 w-4" />
                Manage Profile
            </Link>
        </Button>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Application History</CardTitle>
          <CardDescription>Here are the jobs you've applied for.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Job Title</TableHead>
                <TableHead className="hidden sm:table-cell">Company</TableHead>
                <TableHead className="hidden md:table-cell">Date Applied</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applications.length > 0 ? applications.map(app => (
                <TableRow key={app.id}>
                  <TableCell className="font-medium">{app.jobTitle}</TableCell>
                  <TableCell className="hidden sm:table-cell">{app.company}</TableCell>
                  <TableCell className="hidden md:table-cell">{new Date(app.dateApplied).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant={getStatusBadgeVariant(app.status)} className="capitalize">{app.status}</Badge>
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                    <TableCell colSpan={4} className="text-center h-24">
                        You haven't applied to any jobs yet.
                    </TableCell>
                </TableRow>
               )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
