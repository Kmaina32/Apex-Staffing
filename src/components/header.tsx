
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Triangle, LogOut } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import * as React from 'react';
import { useAuth } from '@/hooks/use-auth';
import { logout } from '@/lib/auth';

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const { user } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/jobs', label: 'Find a Job' },
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
  ];

  if (user) {
    navLinks.push({ href: '/dashboard', label: 'My Dashboard' });
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Triangle className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block">Apex Staffing Group</span>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  pathname === link.href ? "text-foreground" : "text-foreground/60"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        
        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
                <Link href="/" className="flex items-center space-x-2 mb-6" onClick={() => setOpen(false)}>
                    <Triangle className="h-6 w-6 text-primary" />
                    <span className="font-bold">Apex Staffing Group</span>
                </Link>
                <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "text-lg font-medium hover:text-primary",
                          pathname === link.href ? "text-primary" : "text-foreground/80"
                        )}
                    >
                        {link.label}
                    </Link>
                ))}
                </div>
            </SheetContent>
          </Sheet>
        </div>
        
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center gap-2">
             {user ? (
               <Button onClick={handleLogout} variant="ghost">
                 <LogOut className="mr-2 h-4 w-4" />
                 Log Out
               </Button>
             ) : (
               <>
                <Button asChild variant="ghost">
                  <Link href="/login">Log In</Link>
                </Button>
                <Button asChild>
                  <Link href="/register">Register</Link>
                </Button>
               </>
             )}
          </nav>
        </div>
      </div>
    </header>
  );
}
