import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Privacy Policy - CalcPro',
  description: 'Learn how CalcPro collects, uses, and protects your data. We are committed to protecting your privacy.',
  alternates: {
    canonical: '/app/privacy',
  },
  openGraph: {
    title: 'Privacy Policy - CalcPro',
    description: 'Learn how CalcPro collects, uses, and protects your data.',
    url: '/app/privacy',
    siteName: 'CalcPro',
    type: 'website',
  },
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto max-w-3xl py-8 md:py-12">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-2 mb-2">
            <Shield className="h-8 w-8 text-primary" />
            <CardTitle as="h1" className="text-3xl">Privacy Policy</CardTitle>
          </div>
          <CardDescription>
            At CalcPro, we respect your privacy. This policy explains how we handle data.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 text-foreground/80 leading-relaxed">
          
          <section>
            <h2 className="text-xl font-semibold text-primary mb-2">1. Data Collection</h2>
            <p>CalcPro is designed to be used without requiring you to sign up or provide any personal information. All calculations are performed directly in your browser.</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>We do not collect or store the data you enter into our calculators.</li>
              <li>For our "AI Suggestions" feature, your input is sent to a third-party AI service (e.g., Google's Gemini) for processing and is subject to their privacy policies. We do not store this input on our servers.</li>
              <li>We may use analytics tools (like Google Analytics) to collect anonymous usage data to improve our services. This data is not personally identifiable.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary mb-2">2. How We Use Information</h2>
            <p>Anonymous usage data helps us understand which tools are popular, identify technical issues, and improve the overall user experience on CalcPro.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary mb-2">3. Cookies</h2>
            <p>We use cookies for essential site functions, such as remembering your theme preference (light/dark mode). We may also use them for analytics. You can disable cookies in your browser settings, though it may affect site functionality.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary mb-2">4. Data Security</h2>
            <p>We are committed to data security. As we do not collect personal data, the primary risk is limited to the security of your own device and browser. We use HTTPS to encrypt traffic between your browser and our servers.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary mb-2">5. Changes to This Policy</h2>
            <p>This privacy policy may be updated periodically. We will post any changes on this page and update the "Last Updated" date.</p>
          </section>
          
          <div className="border-t pt-4 mt-6 text-sm text-muted-foreground space-y-1">
             <p>📅 <strong>Last Updated:</strong> July 2024</p>
             <p>📧 <strong>Contact:</strong> support@myaiwork.space</p>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}
