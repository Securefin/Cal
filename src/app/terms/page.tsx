
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="container mx-auto max-w-3xl py-8 md:py-12">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-2 mb-2">
            <FileText className="h-8 w-8 text-primary" />
            <CardTitle as="h1" className="text-3xl">Terms of Service</CardTitle>
          </div>
          <CardDescription>
            By accessing or using MyAIWork, you agree to the following terms. Please read them carefully.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 text-foreground/80 leading-relaxed">
          
          <section>
            <h2 className="text-xl font-semibold text-primary mb-2">1. Use of Our Service</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>You agree to use MyAIWork only for lawful purposes.</li>
              <li>You may not use our platform to scrape, spam, or harm our services or other users.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary mb-2">2. AI Tool Listings</h2>
            <p>MyAIWork aggregates third-party AI tools. We do not own or control those tools. Users are responsible for reviewing the terms and privacy of any third-party tools they use.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary mb-2">3. No Guarantees</h2>
            <p>We try to keep our service available and accurate, but we don’t guarantee it will always be correct or uninterrupted.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary mb-2">4. Intellectual Property</h2>
             <ul className="list-disc pl-6 space-y-1">
              <li>All logos, names, and content on MyAIWork are owned by us unless otherwise stated.</li>
              <li>Do not copy or reproduce our content without permission.</li>
            </ul>
          </section>

           <section>
            <h2 className="text-xl font-semibold text-primary mb-2">5. Limitation of Liability</h2>
            <p>MyAIWork is provided “as is”. We are not responsible for any loss or damage resulting from using our site or any listed tools.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary mb-2">6. Modifications</h2>
            <p>We may update these terms at any time. Continued use of the site means you accept the updated terms.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary mb-2">7. Contact</h2>
            <p>For any questions or concerns, contact us at: support@myaiwork.space</p>
          </section>
          
          <div className="border-t pt-4 mt-6 text-sm text-muted-foreground space-y-1">
             <p>📅 <strong>Last Updated:</strong> July 2024</p>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}
