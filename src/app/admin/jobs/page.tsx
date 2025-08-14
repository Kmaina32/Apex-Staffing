
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { getJobs } from "@/lib/firebase";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";


export default async function AdminJobsPage() {
  const jobs = await getJobs();

  return (
    <div className="container mx-auto py-12 px-4 max-w-7xl">
       <header className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold font-headline">Manage Jobs</h1>
              <p className="text-muted-foreground">Create, edit, and manage all job listings.</p>
            </div>
            <Button asChild>
                <Link href="/admin/jobs/new">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create New Job
                </Link>
            </Button>
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
                    {jobs.length > 0 ? jobs.map(job => (
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
                                No jobs created yet.
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
