
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Briefcase, FileText, UserCheck } from 'lucide-react';
import { JobCard } from '@/components/job-card';
import { getJobs } from '@/lib/firebase';

export default async function Home() {
  const allJobs = await getJobs();
  const featuredJobs = allJobs.slice(0, 2);

  return (
    <div className="flex flex-col space-y-12 md:space-y-24 pb-12">
      {/* Hero Section */}
      <section className="w-full pt-20 md:pt-32">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 font-headline">
            Find Jobs Abroad.
            <br />
            <span className="text-primary">Work Anywhere in the World.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-8">
            Your journey to an international career starts here. We connect talented professionals with verified employers across the globe.
          </p>
          <Button asChild size="lg" className="shadow-lg hover:shadow-xl transition-shadow">
            <Link href="/register">
              Register to Work Abroad <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* How it works Section */}
      <section className="w-full">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 font-headline">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <Card className="border-0 shadow-none bg-transparent">
              <CardHeader>
                <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
                  <FileText className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="mt-4">1. Create Your Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Fill out our detailed form and upload your CV. Our AI will help pre-fill your application to save you time.
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-none bg-transparent">
              <CardHeader>
                <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
                  <Briefcase className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="mt-4">2. Get Matched with Jobs</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our smart algorithm matches your skills and preferences with the best international job opportunities.
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-none bg-transparent">
              <CardHeader>
                <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
                  <UserCheck className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="mt-4">3. Get Hired</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Track your application status and get ready to start your new life in a different country.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="w-full">
        <div className="container mx-auto px-4">
            <div className="bg-card p-8 md:p-12 rounded-lg shadow-md">
                <h2 className="text-3xl font-bold text-center mb-12 font-headline">Featured Job Openings</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {featuredJobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                    ))}
                </div>
                <div className="text-center mt-12">
                    <Button asChild variant="link" className="text-lg">
                    <Link href="/jobs">
                        View All Jobs <ArrowRight className="ml-2 h-5 w-w" />
                    </Link>
                    </Button>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
}
