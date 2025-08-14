import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-headline">Terms of Service</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

          <h2 className="text-xl font-semibold pt-4">1. Agreement to Terms</h2>
          <p className="text-muted-foreground">
            By using the Global Talent Bridge website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
          </p>

          <h2 className="text-xl font-semibold pt-4">2. Use of Services</h2>
          <p className="text-muted-foreground">
            You agree to use our services only for lawful purposes. You are responsible for ensuring that all information you provide is accurate, current, and complete. You must not misrepresent your identity or qualifications.
          </p>

          <h2 className="text-xl font-semibold pt-4">3. Intellectual Property</h2>
          <p className="text-muted-foreground">
            All content and materials available on our website, including but not limited to text, graphics, website name, code, images, and logos, are the intellectual property of Global Talent Bridge and are protected by applicable copyright and trademark law.
          </p>

          <h2 className="text-xl font-semibold pt-4">4. Termination</h2>
          <p className="text-muted-foreground">
            We reserve the right to terminate or suspend your access to our services at our sole discretion, without notice, for conduct that we believe violates these Terms of Service or is harmful to other users of the site, us, or third parties, or for any other reason.
          </p>

          <h2 className="text-xl font-semibold pt-4">5. Governing Law</h2>
          <p className="text-muted-foreground">
            These Terms of Service shall be governed by and construed in accordance with the laws of the jurisdiction in which our company is established, without regard to its conflict of law principles.
          </p>

          <h2 className="text-xl font-semibold pt-4">6. Contact Us</h2>
          <p className="text-muted-foreground">
            If you have any questions about these Terms of Service, please contact us at <a href="mailto:legal@globaltalentbridge.com" className="text-primary hover:underline">legal@globaltalentbridge.com</a>.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
