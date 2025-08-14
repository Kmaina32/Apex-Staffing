
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";
import { useActionState, useEffect, useState, useTransition } from "react";
import { useToast } from "@/hooks/use-toast";
import { updateSettingsAction, type FormState } from './actions';
import { getSettings } from "@/lib/firebase";

export default function AdminSettingsPage() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSettings('landingPage').then((data) => {
      if (data) {
        setSettings(data);
      }
      setLoading(false);
    });
  }, []);

  const initialState: FormState = { message: "", errors: undefined };
  const [formState, formAction] = useActionState(updateSettingsAction, initialState);

  useEffect(() => {
    if (formState.message === 'success') {
      toast({
        title: 'Settings Saved!',
        description: 'The landing page settings have been updated.',
      });
    } else if (formState.message === 'error') {
      toast({
        title: 'An Error Occurred',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } else if (formState.message === 'Validation failed. Please check the URLs.') {
       toast({
        title: 'Validation Failed',
        description: 'Please ensure all URLs are valid before saving.',
        variant: 'destructive',
      });
    }
  }, [formState, toast]);


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => {
        formAction(formData);
    });
  };

  if (loading) {
    return (
       <div className="container mx-auto py-12 px-4 max-w-3xl flex justify-center">
         <Loader2 className="h-8 w-8 animate-spin" />
       </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4 max-w-3xl">
      <header className="mb-8">
        <h1 className="text-3xl font-bold font-headline">App Settings</h1>
        <p className="text-muted-foreground">Manage global settings for your application.</p>
      </header>
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Landing Page</CardTitle>
            <CardDescription>Configure the appearance of the public landing page.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold">Hero Section</h3>
              <p className="text-sm text-muted-foreground">Set the background images for the hero section.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="heroImage1">Background Image 1 URL</Label>
                <Input id="heroImage1" name="heroImage1" defaultValue={settings?.heroImage1 || ''} />
                {formState.errors?.heroImage1 && <p className="text-sm text-destructive">{formState.errors.heroImage1[0]}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="heroImage2">Background Image 2 URL</Label>
                <Input id="heroImage2" name="heroImage2" defaultValue={settings?.heroImage2 || ''} />
                 {formState.errors?.heroImage2 && <p className="text-sm text-destructive">{formState.errors.heroImage2[0]}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="heroImage3">Background Image 3 URL</Label>
                <Input id="heroImage3" name="heroImage3" defaultValue={settings?.heroImage3 || ''} />
                 {formState.errors?.heroImage3 && <p className="text-sm text-destructive">{formState.errors.heroImage3[0]}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="heroImage4">Background Image 4 URL</Label>
                <Input id="heroImage4" name="heroImage4" defaultValue={settings?.heroImage4 || ''} />
                 {formState.errors?.heroImage4 && <p className="text-sm text-destructive">{formState.errors.heroImage4[0]}</p>}
              </div>
            </div>
            <Separator />
            <div>
              <h3 className="text-lg font-semibold">General App Settings</h3>
              <p className="text-sm text-muted-foreground">More settings will be available here.</p>
               <div className="text-center py-8 text-muted-foreground">
                <p>App-wide settings placeholder.</p>
              </div>
            </div>
             <Button type="submit" disabled={isPending}>
                {isPending ? <Loader2 className="animate-spin" /> : 'Save Settings'}
              </Button>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}

