
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useEffect, useState } from "react";
import type { UserRecord } from "firebase-admin/auth";
import { Loader2 } from "lucide-react";

export default function AdminCandidatesPage() {
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch('/api/get-users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto py-12 px-4 max-w-7xl">
       <header className="mb-8">
            <div>
              <h1 className="text-3xl font-bold font-headline">Manage Candidates</h1>
              <p className="text-muted-foreground">Browse and manage all registered candidates.</p>
            </div>
       </header>

       <Card>
        <CardHeader>
            <CardTitle>All Candidates</CardTitle>
            <CardDescription>An overview of all candidates on the platform.</CardDescription>
        </CardHeader>
        <CardContent>
             <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Full Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Date Created</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {loading ? (
                         <TableRow>
                            <TableCell colSpan={3} className="text-center h-24">
                                <Loader2 className="mx-auto h-8 w-8 animate-spin" />
                            </TableCell>
                        </TableRow>
                    ) : users.length > 0 ? users.map(user => (
                        <TableRow key={user.uid}>
                            <TableCell className="font-medium">{user.displayName || 'N/A'}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{new Date(user.metadata.creationTime).toLocaleDateString()}</TableCell>
                        </TableRow>
                    )) : (
                         <TableRow>
                            <TableCell colSpan={3} className="text-center h-24">
                                No candidates found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </CardContent>
       </Card>
    </div>
  );
}
