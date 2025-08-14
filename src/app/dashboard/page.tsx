
'use client';

import { useAuth } from '@/hooks/use-auth';
import { getApplicationsForUser } from '@/lib/firebase';
import type { Application } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Edit, FileArchive, LogOut } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { logout } from '@/lib/auth';

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

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  if (loading || !user) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-8">
        <h1 className="text-3xl font-bold font-headline">My Dashboard</h1>
        <p className="text-muted-foreground">Track your job applications and manage your profile.</p>
      </header>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
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
                  {applications.map(app => (
                    <TableRow key={app.id}>
                      <TableCell className="font-medium">{app.jobTitle}</TableCell>
                      <TableCell className="hidden sm:table-cell">{app.company}</TableCell>
                      <TableCell className="hidden md:table-cell">{new Date(app.dateApplied).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <Badge variant={getStatusBadgeVariant(app.status)} className="capitalize">{app.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                   {applications.length === 0 && (
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

        <div className="lg:col-span-1">
          <Card className="sticky top-20">
            <CardHeader className="items-center text-center">
                <Avatar className="w-24 h-24 mb-4">
                    <AvatarImage src={user.photoURL || 'https://placehold.co/100x100.png'} alt={user.displayName || 'User'} />
                    <AvatarFallback>{user.displayName?.charAt(0) || user.email?.charAt(0)}</AvatarFallback>
                </Avatar>
                <CardTitle>{user.displayName || 'User'}</CardTitle>
                <CardDescription>{user.email}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                <Button asChild className="w-full">
                    <Link href="/register"><Edit className="mr-2 h-4 w-4" /> Edit Profile</Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                    <Link href="#"><FileArchive className="mr-2 h-4 w-4" /> Manage Documents</Link>
                </Button>
                <Button onClick={handleLogout} variant="destructive" className="w-full">
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
