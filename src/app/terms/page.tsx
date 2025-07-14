
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Terms of Service - MyAIWork',
  description: 'Please read our Terms of Service carefully before using the MyAIWork website and its services.',
  openGraph: {
    title: 'Terms of Service - MyAIWork',
    description: 'Please read our Terms of Service carefully before using the MyAIWork website.',
    url: '/terms',
    siteName: 'MyAIWork',
    type: 'website',
  },
};

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
              <li>You agree to use MyAIWork only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the website.</li>
              <li>You may not use our platform to scrape, spam, or harm our services or other users.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary mb-2">2. AI Tool Listings</h2>
            <p>MyAIWork is an aggregator of third-party AI tools. We do not own, control, or endorse these tools. Your use of any third-party tool is at your own risk, and you are responsible for reviewing and complying with their respective terms of service and privacy policies.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary mb-2">3. Accuracy of Information</h2>
            <p>While we strive for accuracy, MyAIWork does not guarantee that all information, descriptions, or pricing related to the listed AI tools will be correct, complete, or up-to-date. Use the information at your own discretion.</p>
          </section>

           <section>
            <h2 className="text-xl font-semibold text-primary mb-2">4. Intellectual Property</h2>
             <ul className="list-disc pl-6 space-y-1">
              <li>All logos, names, and content on MyAIWork are owned by us unless otherwise stated.</li>
              <li>Do not copy or reproduce our content without prior written permission.</li>
            </ul>
          </section>

           <section>
            <h2 className="text-xl font-semibold text-primary mb-2">5. Limitation of Liability</h2>
            <p>MyAIWork is provided “as is”. We are not liable for any direct, indirect, incidental, or consequential damages resulting from your use of our site or any third-party tools listed. You agree to indemnify and hold harmless MyAIWork and its owner from any claims arising out of your use of the service.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary mb-2">6. Modifications</h2>
            <p>We reserve the right to modify these terms at any time. We will notify users of any changes by posting the new terms on this page. Your continued use of the site after such changes constitutes your acceptance of the new terms.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary mb-2">7. Contact</h2>
            <p>For any questions or concerns regarding these terms, please contact us at: support@myaiwork.space</p>
          </section>
          
          <div className="border-t pt-4 mt-6 text-sm text-muted-foreground space-y-1">
             <p>📅 <strong>Last Updated:</strong> July 2024</p>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}
