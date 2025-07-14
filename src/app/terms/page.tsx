
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Terms of Service - CalcPro',
  description: 'Please read our Terms of Service carefully before using the CalcPro website and its services.',
  openGraph: {
    title: 'Terms of Service - CalcPro',
    description: 'Please read our Terms of Service carefully before using the CalcPro website.',
    url: '/terms',
    siteName: 'CalcPro',
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
            By accessing or using CalcPro, you agree to the following terms. Please read them carefully.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 text-foreground/80 leading-relaxed">
          
          <section>
            <h2 className="text-xl font-semibold text-primary mb-2">1. Use of Our Service</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>You agree to use CalcPro only for lawful purposes.</li>
              <li>You may not use our platform to scrape, spam, or harm our services or other users.</li>
              <li>The calculators provided are for informational purposes only and should not be used as a substitute for professional advice.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary mb-2">2. Accuracy of Information</h2>
            <p>While we strive for accuracy, CalcPro does not guarantee that all information or calculations will be correct or up-to-date. Use the tools at your own discretion.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary mb-2">3. Intellectual Property</h2>
             <ul className="list-disc pl-6 space-y-1">
              <li>All logos, names, and content on CalcPro are owned by us unless otherwise stated.</li>
              <li>Do not copy or reproduce our content without permission.</li>
            </ul>
          </section>

           <section>
            <h2 className="text-xl font-semibold text-primary mb-2">4. Limitation of Liability</h2>
            <p>CalcPro is provided “as is”. We are not responsible for any loss or damage resulting from using our site or relying on the information provided.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary mb-2">5. Modifications</h2>
            <p>We may update these terms at any time. Continued use of the site means you accept the updated terms.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary mb-2">6. Contact</h2>
            <p>For any questions or concerns, contact us at: support@calcpro.com</p>
          </section>
          
          <div className="border-t pt-4 mt-6 text-sm text-muted-foreground space-y-1">
             <p>📅 <strong>Last Updated:</strong> July 2024</p>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}
