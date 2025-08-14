
import type { Job } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Briefcase, DollarSign, FileText, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
                <CardTitle className="text-xl font-headline">{job.title}</CardTitle>
                <CardDescription className="flex items-center gap-2 pt-1">
                    <Briefcase className="h-4 w-4" /> {job.company}
                </CardDescription>
            </div>
            <Image 
                src={`https://placehold.co/40x30.png`}
                alt={`${job.country} flag`}
                width={40}
                height={30}
                className="rounded-sm border"
                data-ai-hint={`${job.country} flag`}
            />
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="space-y-3 text-sm text-muted-foreground">
            <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> {job.country}</p>
            <p className="flex items-center gap-2"><DollarSign className="h-4 w-4 text-primary" /> {job.salary}</p>
            <p className="flex items-center gap-2"><FileText className="h-4 w-4 text-primary" /> {job.contractDuration}</p>
            <div className="flex items-center gap-2">
                {job.visaSponsored ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                    <XCircle className="h-4 w-4 text-destructive" />
                )}
                Visa Sponsorship {job.visaSponsored ? 'Available' : 'Not Available'}
            </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
            {job.qualifications.slice(0, 2).map((q, i) => (
                <Badge key={i} variant="secondary">{q}</Badge>
            ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full" variant="default">
          <Link href="/register">View Details & Apply</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
