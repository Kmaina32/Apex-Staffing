
"use client";

import * as React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useActionState } from 'react';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { autoFillFromCV } from '@/app/actions';
import { Loader2, Upload, Check } from 'lucide-react';

const formSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters."),
  nationality: z.string().min(2, "Nationality is required."),
  currentLocation: z.string().min(2, "Current location is required."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().min(5, "Please enter a valid phone number."),
  jobSector: z.string().min(1, "Please select a job sector."),
  preferredCountries: z.array(z.string()).nonempty("Select at least one country."),
  languages: z.string().min(2, "Enter languages spoken."),
  workExperience: z.string().min(10, "Please provide a summary of your work experience."),
  education: z.string().min(10, "Please provide a summary of your education."),
  cvFile: z.any().optional(),
  passportFile: z.any().optional(),
  willingToRelocate: z.boolean().default(false).refine(val => val === true, "You must be willing to relocate."),
  hasCriminalRecord: z.boolean().default(false),
  availability: z.string().min(1, "Please specify your availability."),
});

type FormData = z.infer<typeof formSchema>;

const steps = [
  { id: 'Step 1', name: 'Personal Information' },
  { id: 'Step 2', name: 'Skills & Preferences' },
  { id: 'Step 3', name: 'Documents & Final' },
];

export function RegisterForm() {
    const [currentStep, setCurrentStep] = React.useState(0);
    const [cvFileName, setCvFileName] = React.useState<string | null>(null);
    const { toast } = useToast();
    const [isPending, startTransition] = React.useTransition();

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: '',
            nationality: '',
            currentLocation: '',
            email: '',
            phone: '',
            jobSector: '',
            languages: '',
            workExperience: '',
            education: '',
            availability: '',
            willingToRelocate: false,
            hasCriminalRecord: false,
            preferredCountries: [],
        },
    });

    const [formFillState, formFillAction] = useActionState(autoFillFromCV, { message: "" });

    React.useEffect(() => {
        setIsParsing(false);
        if (formFillState.data) {
            Object.entries(formFillState.data).forEach(([key, value]) => {
                if (value && key in form.getValues()) {
                    form.setValue(key as keyof FormData, value);
                }
            });
            toast({
                title: "Success",
                description: formFillState.message,
                variant: "default",
            });
        }
        if (formFillState.error) {
            toast({
                title: "Error",
                description: formFillState.error,
                variant: "destructive",
            });
        }
    }, [formFillState, form, toast]);

    const [isParsing, setIsParsing] = React.useState(false);

    const handleCvUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setIsParsing(true);
            setCvFileName(file.name);
            const reader = new FileReader();
            reader.onload = (e) => {
                const dataUri = e.target?.result as string;
                const formData = new FormData();
                formData.append('cvDataUri', dataUri);
                startTransition(() => {
                    formFillAction(formData);
                });
            };
            reader.readAsDataURL(file);
        }
    };
    
    async function processForm(data: FormData) {
        console.log("Form submitted:", data);
        toast({
            title: "Application Submitted!",
            description: "Thank you! We will review your profile and get in touch.",
        });
        form.reset();
        setCurrentStep(0);
    }
    
    const next = async () => {
        const fields = currentStep === 0 ? ['fullName', 'nationality', 'currentLocation', 'email', 'phone'] : 
                      currentStep === 1 ? ['jobSector', 'preferredCountries', 'languages', 'workExperience', 'education'] : [];
        const output = await form.trigger(fields as (keyof FormData)[], { shouldFocus: true });
        if (!output) return;
        setCurrentStep(step => step + 1);
    };

    const prev = () => setCurrentStep(step => step - 1);

  return (
    <FormProvider {...form}>
      <Progress value={((currentStep + 1) / steps.length) * 100} className="mb-8" />
      <form onSubmit={form.handleSubmit(processForm)} className="space-y-8">
        {currentStep === 0 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">{steps[0].name}</h3>
            <FormField name="fullName" control={form.control} render={({ field }) => (
                <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <div className="grid md:grid-cols-2 gap-4">
              <FormField name="nationality" control={form.control} render={({ field }) => (
                  <FormItem><FormLabel>Nationality</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField name="currentLocation" control={form.control} render={({ field }) => (
                  <FormItem><FormLabel>Current Location</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
              )} />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <FormField name="email" control={form.control} render={({ field }) => (
                  <FormItem><FormLabel>Email Address</FormLabel><FormControl><Input {...field} type="email" /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField name="phone" control={form.control} render={({ field }) => (
                  <FormItem><FormLabel>Phone / WhatsApp</FormLabel><FormControl><Input {...field} type="tel" /></FormControl><FormMessage /></FormItem>
              )} />
            </div>
          </div>
        )}

        {currentStep === 1 && (
            <div className="space-y-4">
            <h3 className="text-xl font-semibold">{steps[1].name}</h3>
            <FormField name="jobSector" control={form.control} render={({ field }) => (
              <FormItem><FormLabel>Desired Job Sector</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl><SelectTrigger><SelectValue placeholder="Select a sector" /></SelectTrigger></FormControl>
                  <SelectContent>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="tech">Information Technology</SelectItem>
                    <SelectItem value="construction">Construction</SelectItem>
                    <SelectItem value="hospitality">Hospitality</SelectItem>
                  </SelectContent>
                </Select><FormMessage />
              </FormItem>
            )} />
            <FormField
              name="preferredCountries"
              control={form.control}
              render={() => (
                <FormItem>
                  <FormLabel>Preferred Countries</FormLabel>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {["Germany", "UK", "Canada", "Australia", "USA", "UAE"].map(country => (
                      <FormField key={country} name="preferredCountries" control={form.control} render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox 
                              checked={field.value?.includes(country)}
                              onCheckedChange={(checked) => {
                                return checked 
                                  ? field.onChange([...(field.value || []), country])
                                  : field.onChange(field.value?.filter(v => v !== country))
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">{country}</FormLabel>
                        </FormItem>
                      )} />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField name="languages" control={form.control} render={({ field }) => (
                <FormItem><FormLabel>Languages Spoken</FormLabel><FormControl><Input {...field} placeholder="e.g., English, German (B2)" /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField name="workExperience" control={form.control} render={({ field }) => (
                <FormItem><FormLabel>Work Experience Summary</FormLabel><FormControl><Textarea {...field} rows={5} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField name="education" control={form.control} render={({ field }) => (
                <FormItem><FormLabel>Education / Qualifications</FormLabel><FormControl><Textarea {...field} rows={3} /></FormControl><FormMessage /></FormItem>
            )} />
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">{steps[2].name}</h3>
            <FormItem>
              <FormLabel>Upload CV (PDF, DOCX)</FormLabel>
              <FormDescription>Upload your CV and we'll try to auto-fill some fields for you.</FormDescription>
              <div className="relative">
                <Button type="button" variant="outline" asChild>
                    <label htmlFor="cv-upload" className="cursor-pointer">
                        <Upload className="mr-2 h-4 w-4" />
                        Choose CV
                    </label>
                </Button>
                <Input id="cv-upload" type="file" className="hidden" accept=".pdf,.doc,.docx" onChange={handleCvUpload} />
                {(isParsing || isPending) && <Loader2 className="absolute top-2 left-32 h-5 w-5 animate-spin" />}
                {cvFileName && !(isParsing || isPending) && <span className="ml-4 text-sm text-muted-foreground">{cvFileName} <Check className="inline h-4 w-4 text-green-500"/></span>}
              </div>
            </FormItem>
             <FormField name="availability" control={form.control} render={({ field }) => (
                <FormItem><FormLabel>Availability to Travel</FormLabel><FormControl><Input {...field} placeholder="e.g., Immediately, within 3 months" /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField name="willingToRelocate" control={form.control} render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
                <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>I confirm I am willing to relocate internationally.</FormLabel>
                </div>
              </FormItem>
            )} />
            <FormField name="hasCriminalRecord" control={form.control} render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>I have a criminal record.</FormLabel>
                  <FormDescription>Please check this box if applicable.</FormDescription>
                </div>
              </FormItem>
            )} />
          </div>
        )}

        <div className="flex gap-4 pt-4">
          {currentStep > 0 && <Button type="button" onClick={prev} variant="secondary">Back</Button>}
          {currentStep < steps.length - 1 && <Button type="button" onClick={next}>Next</Button>}
          {currentStep === steps.length - 1 && <Button type="submit">Submit Application</Button>}
        </div>
      </form>
    </FormProvider>
  );
}

    