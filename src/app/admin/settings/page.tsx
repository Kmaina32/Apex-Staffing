
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export default function AdminSettingsPage() {
  const [isSaving, setIsSaving] = useState(false);

  // In a real app, you'd fetch these values from your database
  const currentSettings = {
    heroImage1: 'https://placehold.co/1920x1080.png',
    heroImage2: 'https://placehold.co/1920x1080.png',
    heroImage3: 'https://placehold.co/1920x1080.png',
    heroImage4: 'https://placehold.co/1920x1080.png',
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);
    // Here you would call a server action to save the settings
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
    setIsSaving(false);
  };

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
                <Input id="heroImage1" name="heroImage1" defaultValue={currentSettings.heroImage1} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="heroImage2">Background Image 2 URL</Label>
                <Input id="heroImage2" name="heroImage2" defaultValue={currentSettings.heroImage2} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="heroImage3">Background Image 3 URL</Label>
                <Input id="heroImage3" name="heroImage3" defaultValue={currentSettings.heroImage3} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="heroImage4">Background Image 4 URL</Label>
                <Input id="heroImage4" name="heroImage4" defaultValue={currentSettings.heroImage4} />
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
             <Button type="submit" disabled={isSaving}>
                {isSaving ? <Loader2 className="animate-spin" /> : 'Save Settings'}
              </Button>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
