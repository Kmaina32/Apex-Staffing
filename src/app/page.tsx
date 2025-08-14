
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Briefcase, FileText, UserCheck, Loader2 } from 'lucide-react';
import { JobCard } from '@/components/job-card';
import { getJobs, getSettings } from '@/lib/firebase';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { Job } from '@/lib/types';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';


export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [featuredJobs, setFeaturedJobs] = useState<Job[]>([]);
  const [jobsLoading, setJobsLoading] = useState(true);
  const [heroImages, setHeroImages] = useState<string[]>([]);
  const [settingsLoading, setSettingsLoading] = useState(true);

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.replace('/dashboard');
      } else {
        getJobs().then(allJobs => {
          setFeaturedJobs(allJobs.slice(0, 2));
          setJobsLoading(false);
        });
        getSettings('landingPage').then(settings => {
          if (settings) {
            setHeroImages([
              settings.heroImage1,
              settings.heroImage2,
              settings.heroImage3,
              settings.heroImage4,
            ].filter(Boolean));
          } else {
             setHeroImages([]);
          }
          setSettingsLoading(false);
        })
      }
    }
  }, [user, loading, router]);


  if (loading || user || settingsLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    )
  }

  const displayImages = heroImages.length > 0 ? heroImages : ['https://placehold.co/1200x500.png'];

  return (
    <div className="flex flex-col space-y-12 md:space-y-24 pb-12">
      {/* Hero Section */}
      <section className="w-full pt-16 md:pt-24">
        <div className="container mx-auto px-4">
           <div className="relative rounded-2xl overflow-hidden text-center text-white min-h-[400px] md:min-h-[500px]">
             <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full h-full"
              >
                <CarouselContent>
                  {displayImages.map((src, index) => (
                    <CarouselItem key={index}>
                      <div className="relative w-full h-[400px] md:h-[500px]">
                        <Image
                          src={src}
                          alt={`Hero background image ${index + 1}`}
                          layout="fill"
                          objectFit="cover"
                          className="w-full h-full"
                          data-ai-hint="people working office"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
            </Carousel>

            <div className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center p-8">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 font-headline">
                Find Jobs Abroad.
                <br />
                <span className="text-primary">Work Anywhere in the World.</span>
              </h1>
              <p className="max-w-2xl mx-auto text-lg md:text-xl text-neutral-200 mb-8">
                Your journey to an international career starts here. We connect talented professionals with verified employers across the globe.
              </p>
              <Button asChild size="lg" className="shadow-lg hover:shadow-xl transition-shadow">
                <Link href="/register">
                  Register to Work Abroad <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
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
                {jobsLoading ? (
                   <div className="flex justify-center">
                    <Loader2 className="h-8 w-8 animate-spin" />
                   </div>
                ) : (
                  <>
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
                  </>
                )}
            </div>
        </div>
      </section>
    </div>
  );
}
