
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function AdminJobsPage() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-7xl">
       <header className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold font-headline">Manage Jobs</h1>
              <p className="text-muted-foreground">Create, edit, and manage all job listings.</p>
            </div>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create New Job
            </Button>
       </header>

       <Card>
        <CardHeader>
            <CardTitle>All Job Listings</CardTitle>
            <CardDescription>An overview of all available jobs on the platform.</CardDescription>
        </CardHeader>
        <CardContent>
            {/* Placeholder for jobs table */}
            <div className="text-center py-12 text-muted-foreground">
              <p>Job listings table will be displayed here.</p>
            </div>
        </CardContent>
       </Card>
    </div>
  );
}
