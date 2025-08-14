
import { LoginForm } from '@/components/login-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LogIn } from 'lucide-react';

export default function LoginPage() {
    return (
        <div className="container mx-auto py-12 px-4 max-w-md">
            <Card>
                <CardHeader className="text-center items-center">
                    <div className="bg-primary/10 p-3 rounded-full mb-4">
                        <LogIn className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-3xl font-headline">Welcome Back</CardTitle>
                    <CardDescription>Log in to access your dashboard.</CardDescription>
                </CardHeader>
                <CardContent>
                    <LoginForm />
                </CardContent>
            </Card>
        </div>
    );
}
