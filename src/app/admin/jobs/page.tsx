
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Loader2, DatabaseZap } from "lucide-react";
import Link from "next/link";
import { getJobs } from "@/lib/firebase";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { Job } from "@/lib/types";
import { useEffect, useState, useTransition } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";


export default function AdminJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSeeding, startSeedingTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();
  
  useEffect(() => {
    getJobs().then(jobs => {
      setJobs(jobs);
      setLoading(false);
    });
  }, []);

  const handleSeed = async () => {
    startSeedingTransition(async () => {
        try {
            const response = await fetch('/api/seed-database');

            // Check if the response is ok (status in the range 200-299)
            if (!response.ok) {
                // Try to get a more specific error message from the response body
                let errorData;
                try {
                    errorData = await response.json();
                } catch (e) {
                    // If the response body is not JSON, use the status text
                    errorData = { message: response.statusText };
                }
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            if (result.success) {
                toast({
                    title: "Database Seeded!",
                    description: "Your database has been populated with sample job listings."
                });
                // Refresh the job list after seeding
                setLoading(true);
                const updatedJobs = await getJobs();
                setJobs(updatedJobs);
                setLoading(false);
                router.refresh();
            } else {
                 toast({
                    title: "Seeding Failed",
                    description: result.error || "An unknown error occurred.",
                    variant: "destructive"
                });
            }
        } catch (error: any) {
            console.error('Seeding error:', error);
            toast({
                title: "Seeding Operation Failed",
                description: error.message || "An unknown error occurred. Check the console for details.",
                variant: "destructive"
            });
        }
    });
  };

  return (
    <div className="container mx-auto py-12 px-4 max-w-7xl">
       <header className="mb-8 flex items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold font-headline">Manage Jobs</h1>
              <p className="text-muted-foreground">Create, edit, and manage all job listings.</p>
            </div>
            <div className="flex items-center gap-2">
              <Button onClick={handleSeed} disabled={isSeeding} variant="outline">
                {isSeeding ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <DatabaseZap className="mr-2 h-4 w-4" />}
                Seed Jobs
              </Button>
              <Button asChild>
                  <Link href="/admin/jobs/new">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Create New Job
                  </Link>
              </Button>
            </div>
       </header>

       <Card>
        <CardHeader>
            <CardTitle>All Job Listings</CardTitle>
            <CardDescription>An overview of all available jobs on the platform.</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Country</TableHead>
                        <TableHead>Visa Sponsored</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {loading ? (
                         <TableRow>
                            <TableCell colSpan={4} className="text-center h-24">
                                <Loader2 className="mx-auto h-8 w-8 animate-spin" />
                            </TableCell>
                        </TableRow>
                    ) : jobs.length > 0 ? jobs.map(job => (
                        <TableRow key={job.id}>
                            <TableCell className="font-medium">{job.title}</TableCell>
                            <TableCell>{job.company}</TableCell>
                            <TableCell>{job.country}</TableCell>
                            <TableCell>
                                <Badge variant={job.visaSponsored ? 'default' : 'secondary'}>
                                    {job.visaSponsored ? 'Yes' : 'No'}
                                </Badge>
                            </TableCell>
                        </TableRow>
                    )) : (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center h-24">
                                No jobs created yet. Use the "Seed Jobs" button to add some examples.
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
