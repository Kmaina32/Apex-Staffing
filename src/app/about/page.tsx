import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, Globe, Target } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-5xl">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold font-headline text-primary">About Apex Staffing Group</h1>
        <p className="text-lg text-muted-foreground mt-2">Connecting global talent with worldwide opportunities.</p>
      </header>

      <Card className="mb-12">
        <CardHeader>
          <CardTitle>Our Story</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Apex Staffing Group was founded with a simple mission: to make international hiring and job searching a seamless and transparent process. We saw the challenges that both talented professionals and innovative companies faced in connecting across borders. Our platform was built to bridge that gap, leveraging technology to create opportunities and foster a global workforce. We believe that talent has no borders, and we are dedicated to helping people build their dream careers, anywhere in the world.
          </p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-3 gap-8 text-center">
        <Card>
          <CardHeader className="items-center">
            <div className="p-3 bg-primary/10 rounded-full">
              <Globe className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="mt-4">Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">To empower professionals to find meaningful work abroad and help companies build diverse, world-class teams.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="items-center">
            <div className="p-3 bg-primary/10 rounded-full">
              <Target className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="mt-4">Our Vision</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">To become the world's most trusted platform for international recruitment, known for our integrity and innovation.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="items-center">
            <div className="p-3 bg-primary/10 rounded-full">
              <Building className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="mt-4">Our Values</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">We value transparency, efficiency, and a human-centric approach in everything we do.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
