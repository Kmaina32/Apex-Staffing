
'use client';

import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, ShieldCheck } from 'lucide-react';
import { ADMIN_USER_IDS } from '@/lib/admin';

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
    <div className="container mx-auto py-12 px-4 max-w-4xl">
       <Card>
        <CardHeader className="items-center text-center">
             <ShieldCheck className="h-12 w-12 text-primary" />
            <CardTitle className="text-3xl font-headline mt-4">Admin Dashboard</CardTitle>
            <CardDescription>This is a protected area for administrators.</CardDescription>
        </CardHeader>
        <CardContent>
            <p className="text-center text-muted-foreground">
                Welcome, admin! Here you can manage users, job listings, and applications.
            </p>
            {/* Admin components and data tables will go here */}
        </CardContent>
       </Card>
    </div>
  );
}
