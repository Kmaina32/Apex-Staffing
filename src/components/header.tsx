
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Triangle, LogOut, User, LayoutDashboard, UserPlus, Settings, Shield, Briefcase, Users, Sun, Moon } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import * as React from 'react';
import { useAuth } from '@/hooks/use-auth';
import { logout } from '@/lib/auth';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { ADMIN_USER_IDS } from '@/lib/admin';
import { useTheme } from 'next-themes';


export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const { user } = useAuth();
  const { setTheme, theme } = useTheme();

  const isAdmin = user ? ADMIN_USER_IDS.includes(user.uid) : false;
  const onAdminPage = pathname.startsWith('/admin');

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };
  
  const baseNavLinks = [
    { href: '/', label: 'Home' },
    { href: '/jobs', label: 'Find a Job' },
  ];

  const loggedInNavLinks = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/jobs', label: 'Find a Job' },
    { href: '/applications', label: 'My Applications' },
  ];

  const adminNavLinks = [
    { href: '/admin', label: 'Dashboard', icon: <LayoutDashboard /> },
    { href: '/admin/jobs', label: 'Jobs', icon: <Briefcase /> },
    { href: '/admin/candidates', label: 'Candidates', icon: <Users /> },
  ];

  const getNavLinks = () => {
    if (isAdmin && onAdminPage) {
      return adminNavLinks;
    }
    if (user) {
      return loggedInNavLinks;
    }
    return baseNavLinks;
  }

  const navLinks = getNavLinks();


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
                  "transition-colors hover:text-foreground/80 flex items-center gap-2",
                  pathname === link.href ? "text-foreground" : "text-foreground/60"
                )}
              >
                {(isAdmin && onAdminPage) && link.icon}
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
                <SheetHeader className="sr-only">
                    <SheetTitle>Menu</SheetTitle>
                    <SheetDescription>
                    Navigation links for the application.
                    </SheetDescription>
                </SheetHeader>
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
                          "text-lg font-medium hover:text-primary flex items-center gap-2",
                          pathname === link.href ? "text-primary" : "text-foreground/80"
                        )}
                    >
                        {(isAdmin && onAdminPage) && link.icon}
                        {link.label}
                    </Link>
                ))}
                </div>
            </SheetContent>
          </Sheet>
        </div>
        
        <div className="flex flex-1 items-center justify-end space-x-2">
          <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          <nav className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  {user ? (
                    <Avatar className="h-8 w-8">
                       <AvatarImage src={user.photoURL || undefined} alt={user.displayName || 'User'} />
                       <AvatarFallback>{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  ) : (
                    <User className="h-5 w-5" />
                  )}
                  <span className="sr-only">User menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {user ? (
                  <>
                    <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {isAdmin && (
                      <DropdownMenuItem asChild>
                        <Link href="/admin"><Shield className="mr-2 h-4 w-4" />Admin</Link>
                      </DropdownMenuItem>
                    )}
                     <DropdownMenuItem asChild>
                      <Link href="/dashboard"><LayoutDashboard className="mr-2 h-4 w-4" />Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/profile"><User className="mr-2 h-4 w-4" />Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/settings"><Settings className="mr-2 h-4 w-4" />Settings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" /> Log Out
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuLabel>Guest</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/login"><User className="mr-2 h-4 w-4" />Log In</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/register"><UserPlus className="mr-2 h-4 w-4" />Register</Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
      </div>
    </header>
  );
}
