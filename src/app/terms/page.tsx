import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Terms of Service - CalcPro',
  description: 'Please read our Terms of Service carefully before using the CalcPro website and its services.',
  alternates: {
    canonical: '/app/terms',
  },
  openGraph: {
    title: 'Terms of Service - CalcPro',
    description: 'Please read our Terms of Service carefully before using the CalcPro website.',
    url: '/app/terms',
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
              <li>You agree to use CalcPro only for lawful purposes and in a way that does not infringe upon the rights of others.</li>
              <li>The calculators and tools provided on this site are for informational and educational purposes only.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary mb-2">2. Disclaimer of Accuracy</h2>
            <p>While we strive for accuracy in all our calculators, CalcPro does not guarantee that the results will be correct, complete, or up-to-date. The calculations should not be used as a substitute for professional advice (e.g., financial, medical, or engineering advice).</p>
          </section>

           <section>
            <h2 className="text-xl font-semibold text-primary mb-2">3. Intellectual Property</h2>
             <ul className="list-disc pl-6 space-y-1">
              <li>All content, branding, and calculators on CalcPro are the property of its owner unless otherwise stated.</li>
              <li>You may not copy, reproduce, or distribute our content or tools without prior written permission.</li>
            </ul>
          </section>

           <section>
            <h2 className="text-xl font-semibold text-primary mb-2">4. Limitation of Liability</h2>
            <p>CalcPro is provided “as is”. We are not liable for any direct, indirect, incidental, or consequential damages resulting from your use of our site or reliance on the information provided by our tools. You agree to use the service at your own risk.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary mb-2">5. Modifications</h2>
            <p>We reserve the right to modify these terms at any time. We will notify users of any changes by posting the new terms on this page. Your continued use of the site after such changes constitutes your acceptance of the new terms.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary mb-2">6. Contact</h2>
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
