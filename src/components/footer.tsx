
import Link from "next/link";
import { Triangle } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full mt-auto bg-card border-t">
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
                 <Link href="/" className="mb-4 flex items-center space-x-2">
                    <Triangle className="h-6 w-6 text-primary" />
                    <span className="font-bold text-lg">Apex Staffing Group</span>
                </Link>
                <p className="text-muted-foreground text-sm">Connecting global talent with worldwide opportunities.</p>
            </div>
            <div className="flex flex-col space-y-2">
                <h4 className="font-semibold">For Candidates</h4>
                <Link href="/jobs" className="text-muted-foreground hover:text-primary text-sm">Find Jobs</Link>
                <Link href="/register" className="text-muted-foreground hover:text-primary text-sm">Create Profile</Link>
                <Link href="/dashboard" className="text-muted-foreground hover:text-primary text-sm">Application Status</Link>
            </div>
             <div className="flex flex-col space-y-2">
                <h4 className="font-semibold">Company</h4>
                <Link href="/about" className="text-muted-foreground hover:text-primary text-sm">About Us</Link>
                <Link href="/contact" className="text-muted-foreground hover:text-primary text-sm">Contact</Link>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary text-sm">Privacy Policy</Link>
                <Link href="/terms" className="text-muted-foreground hover:text-primary text-sm">Terms of Service</Link>
            </div>
        </div>
        <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
             &copy; {new Date().getFullYear()} Apex Staffing Group. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
