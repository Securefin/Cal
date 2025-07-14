
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Send, Globe, MapPin } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - CalcPro",
  description: "Get in touch with the CalcPro team. We welcome your feedback, questions, and suggestions.",
  openGraph: {
    title: "Contact Us - CalcPro",
    description: "Get in touch with the CalcPro team.",
    url: "/contact",
    siteName: "CalcPro",
    type: "website",
  },
};


export default function ContactPage() {
  return (
    <div className="container mx-auto max-w-4xl py-12 md:py-16 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Contact Us</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          We'd love to hear from you! Whether it's feedback, partnership inquiries, or just a hello — get in touch with the CalcPro team.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 md:gap-12">
        {/* Contact Form Section */}
        <div className="md:col-span-1">
          <Card className="shadow-lg border-border/40">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Send className="mr-3 h-6 w-6 text-primary" />
                Send us a Message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your Name" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="your@email.com" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="What is this about?" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Your message..." className="min-h-[120px]" />
                </div>
                <Button type="submit" size="lg" className="w-full">
                  Send Message
                </Button>
                 <p className="text-xs text-center text-muted-foreground pt-2">
                    Note: This is a visual representation. The form is not yet connected.
                  </p>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Contact Info Section */}
        <div className="space-y-6 md:col-span-1">
            <h2 className="text-2xl font-semibold border-b pb-2">Contact Information</h2>
            <div className="space-y-4 text-md text-foreground/80">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 mt-1 text-primary" />
                <div>
                  <h3 className="font-semibold text-foreground">Email</h3>
                  <a href="mailto:support@myaiwork.space" className="hover:text-primary transition-colors">
                    support@myaiwork.space
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Globe className="h-5 w-5 mt-1 text-primary" />
                <div>
                  <h3 className="font-semibold text-foreground">Website</h3>
                   <a href="https://myaiwork.space" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                    www.myaiwork.space
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 mt-1 text-primary" />
                <div>
                  <h3 className="font-semibold text-foreground">Location</h3>
                  <p>Mumbai, India</p>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}
