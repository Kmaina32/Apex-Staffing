
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useActionState, useEffect, useTransition } from 'react';
import { useRouter } from 'next/navigation';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { createJobAction, type FormState } from './actions';
import { Loader2 } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const jobSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters."),
  company: z.string().min(2, "Company name is required."),
  country: z.string().min(2, "Country is required."),
  countryCode: z.string().min(2, "Country code is required (e.g., 'de', 'ca')."),
  salary: z.string().min(3, "Salary information is required."),
  contractDuration: z.string().min(3, "Contract duration is required."),
  qualifications: z.string().min(10, "Please list some qualifications."),
  languageRequirements: z.string().min(3, "Language requirements are needed."),
  visaSponsored: z.boolean().default(false),
  description: z.string().min(20, "Description must be at least 20 characters."),
});

type JobFormData = z.infer<typeof jobSchema>;

export default function NewJobPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const initialState: FormState = { message: "", errors: undefined };
  const [formState, formAction] = useActionState(createJobAction, initialState);

  const form = useForm<JobFormData>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: "",
      company: "",
      country: "",
      countryCode: "",
      salary: "",
      contractDuration: "",
      qualifications: "",
      languageRequirements: "",
      visaSponsored: false,
      description: "",
    },
  });

  useEffect(() => {
    if (formState.message === 'success') {
      toast({
        title: 'Job Created!',
        description: 'The new job listing has been successfully created.',
      });
      router.push('/admin/jobs');
    } else if (formState.message === 'error') {
      toast({
        title: 'An Error Occurred',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    }
  }, [formState, router, toast]);


  const onSubmit = (data: JobFormData) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (typeof value === 'boolean') {
        formData.append(key, value ? 'on' : '');
      } else {
        formData.append(key, value as string);
      }
    });

    startTransition(() => {
        formAction(formData);
    });
  };

  return (
    <div className="container mx-auto py-12 px-4 max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle>Create New Job</CardTitle>
          <CardDescription>Fill out the details for the new job listing.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Title</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Registered Nurse" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., HealthCare Germany" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Germany" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="countryCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country Code</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., de" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="salary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Salary</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., €55,000 - €65,000 per year" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contractDuration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contract Duration</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 2 years" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

               <FormField
                  control={form.control}
                  name="qualifications"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Qualifications (comma-separated)</FormLabel>
                      <FormControl>
                        <Input placeholder="BSc in Nursing, 3+ years experience" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="languageRequirements"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Language Requirements (comma-separated)</FormLabel>
                      <FormControl>
                        <Input placeholder="German, English" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Description</FormLabel>
                      <FormControl>
                        <Textarea rows={5} placeholder="Describe the job in detail..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              
               <FormField
                  control={form.control}
                  name="visaSponsored"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                         <FormLabel>Visa Sponsorship</FormLabel>
                         <FormMessage />
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />


              <Button type="submit" disabled={isPending}>
                {isPending ? <Loader2 className="animate-spin" /> : 'Create Job Listing'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
