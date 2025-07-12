import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MessageSquare } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="container mx-auto max-w-3xl py-8 md:py-12">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-2 mb-2">
            <Mail className="h-8 w-8 text-primary" />
            <CardTitle as="h1" className="text-3xl">Contact Us</CardTitle>
          </div>
          <CardDescription>
            We'd love to hear from you! Whether you have a question, feedback, or a suggestion, feel free to reach out.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 text-foreground/80 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-primary mb-3">Get in Touch</h2>
            <p>
              For any inquiries, support requests, or feedback regarding CalcPro, please email us at:
            </p>
            <p className="mt-2">
              <a
                href="mailto:contact@calcpro.com" // Replace with your actual contact email
                className="text-primary hover:underline font-semibold text-lg"
              >
                contact@calcpro.com
              </a>
            </p>
            <p className="mt-4">
              We aim to respond to all inquiries within 24-48 business hours.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary mb-3">Feedback & Suggestions</h2>
            <p>
              Your feedback is invaluable to us as we strive to improve CalcPro. If you have any suggestions for new
              calculators, features you'd like to see, or ways we can enhance your experience, please don't hesitate
              to share them.
            </p>
          </section>
          
          {/* Placeholder for a future contact form
          <section>
            <h2 className="text-xl font-semibold text-primary mb-3">Contact Form</h2>
            <div className="p-6 border rounded-lg bg-muted/30">
              <p className="text-muted-foreground text-center">
                <MessageSquare className="inline-block h-6 w-6 mr-2" />
                Our contact form will be available here soon!
              </p>
            </div>
          </section>
          */}

        </CardContent>
      </Card>
    </div>
  );
}
