
import { RegisterForm } from '@/components/register-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';

export default function RegisterPage() {
    return (
        <div className="container mx-auto py-12 px-4 max-w-4xl">
            <Card>
                <CardHeader className="text-center items-center">
                    <div className="bg-primary/10 p-3 rounded-full mb-4">
                        <FileText className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-3xl font-headline">Register to Work Abroad</CardTitle>
                    <CardDescription>Complete your profile to get matched with your dream job.</CardDescription>
                </CardHeader>
                <CardContent>
                    <RegisterForm />
                </CardContent>
            </Card>
        </div>
    );
}
