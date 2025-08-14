
import { JobCard } from '@/components/job-card';
import { getJobs } from '@/lib/firebase';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default async function JobsPage() {
  const jobs = await getJobs();
  const uniqueCountries = [...new Set(jobs.map(job => job.country))];
  const uniqueSectors = ["Healthcare", "Tech", "Construction", "Hospitality"];

  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold font-headline">Find Your Next Job Abroad</h1>
        <p className="text-lg text-muted-foreground mt-2">Browse through hundreds of international job openings.</p>
      </header>

      {/* Filters */}
      <Card className="p-4 md:p-6 mb-8 shadow-sm bg-card">
        <CardContent className="p-0 pt-4 md:pt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input placeholder="Job title, keywords..." className="pl-10 bg-background" />
            </div>
            <Select>
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Select a country" />
              </SelectTrigger>
              <SelectContent>
                {uniqueCountries.map(country => (
                  <SelectItem key={country} value={country.toLowerCase()}>{country}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Select a job sector" />
              </SelectTrigger>
              <SelectContent>
                {uniqueSectors.map(sector => (
                  <SelectItem key={sector} value={sector.toLowerCase()}>{sector}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button className="w-full">
              <Search className="mr-2 h-4 w-4" />
              Search Jobs
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Job Listings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {jobs.map(job => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}
