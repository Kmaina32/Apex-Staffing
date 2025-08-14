import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-headline">Contact Us</CardTitle>
          <CardDescription>We'd love to hear from you. Reach out with any questions or feedback.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Get in Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Mail className="h-5 w-5 text-primary" />
                  <a href="mailto:support@apexstaffinggroup.com" className="text-muted-foreground hover:text-primary">support@apexstaffinggroup.com</a>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="h-5 w-5 text-primary mt-1" />
                  <span className="text-muted-foreground">
                    123 Apex Tower, Suite 500<br/>
                    Summit City, World 12345
                  </span>
                </div>
              </div>
            </div>
            <form className="space-y-4">
               <Input placeholder="Your Name" />
               <Input type="email" placeholder="Your Email" />
               <Input placeholder="Subject" />
               <Textarea placeholder="Your Message" rows={5} />
               <Button className="w-full">Send Message</Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
