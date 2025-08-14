
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getUsers } from "@/lib/firebase-admin";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default async function AdminCandidatesPage() {
  const users = await getUsers();

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
                    {users.length > 0 ? users.map(user => (
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
