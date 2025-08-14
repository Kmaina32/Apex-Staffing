
'use client';

import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Loader2, UploadCloud } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="container mx-auto py-12 px-4 flex justify-center items-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4 max-w-3xl">
      <header className="mb-8">
        <h1 className="text-3xl font-bold font-headline">My Profile</h1>
        <p className="text-muted-foreground">Manage your personal information and documents.</p>
      </header>
      <Card>
        <CardHeader>
            <div className="flex items-start gap-6">
                 <Avatar className="w-24 h-24">
                    <AvatarImage src={user.photoURL || 'https://placehold.co/100x100.png'} alt={user.displayName || 'User'} />
                    <AvatarFallback>{user.displayName?.charAt(0) || user.email?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 pt-2">
                    <CardTitle className="text-2xl font-headline">{user.displayName || 'User'}</CardTitle>
                    <CardDescription>{user.email}</CardDescription>
                    <Button variant="outline" size="sm" className="mt-4">
                        <UploadCloud className="mr-2 h-4 w-4" />
                        Change Photo
                    </Button>
                </div>
            </div>
        </CardHeader>
        <CardContent className="space-y-8">
            <Separator />
            <form className="space-y-6">
                 <div>
                    <h3 className="text-lg font-semibold">Personal Information</h3>
                    <p className="text-sm text-muted-foreground">Update your personal details here.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input id="fullName" defaultValue={user.displayName || ''} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" defaultValue={user.email || ''} disabled />
                    </div>
                </div>

                <Separator />
                
                <div>
                    <h3 className="text-lg font-semibold">Upload Documents</h3>
                    <p className="text-sm text-muted-foreground">Please upload your CV, passport, and other relevant documents.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="cv">CV / Resume</Label>
                        <Input id="cv" type="file" />
                        <p className="text-xs text-muted-foreground">PDF, DOC, DOCX. Max size 5MB.</p>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="passport">Passport</Label>
                        <Input id="passport" type="file" />
                        <p className="text-xs text-muted-foreground">PDF, JPG, PNG. Max size 2MB.</p>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="certs">Educational Certificates</Label>
                        <Input id="certs" type="file" multiple />
                         <p className="text-xs text-muted-foreground">You can select multiple files.</p>
                    </div>
                </div>
                 <Button type="submit">Update Profile</Button>
            </form>
        </CardContent>
      </Card>
    </div>
  );
}

