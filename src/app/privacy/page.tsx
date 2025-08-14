import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-headline">Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-xl font-semibold pt-4">1. Introduction</h2>
          <p className="text-muted-foreground">
            Apex Staffing Group ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website.
          </p>

          <h2 className="text-xl font-semibold pt-4">2. Information We Collect</h2>
          <p className="text-muted-foreground">
            We may collect personal information from you such as your name, email address, phone number, work experience, and other information you provide in your profile and CV. We also collect information automatically as you navigate the site, such as usage details and IP addresses.
          </p>

          <h2 className="text-xl font-semibold pt-4">3. How We Use Your Information</h2>
          <p className="text-muted-foreground">
            We use the information we collect to:
            <ul className="list-disc list-inside pl-4 mt-2">
              <li>Provide, operate, and maintain our services.</li>
              <li>Match you with potential job opportunities.</li>
              <li>Communicate with you, including responding to your inquiries.</li>
              <li>Improve and personalize our services.</li>
              <li>Comply with legal obligations.</li>
            </ul>
          </p>

          <h2 className="text-xl font-semibold pt-4">4. Data Security</h2>
          <p className="text-muted-foreground">
            We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.
          </p>
          
          <h2 className="text-xl font-semibold pt-4">5. Contact Us</h2>
          <p className="text-muted-foreground">
            If you have questions or comments about this Privacy Policy, please contact us at <a href="mailto:privacy@apexstaffinggroup.com" className="text-primary hover:underline">privacy@apexstaffinggroup.com</a>.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
