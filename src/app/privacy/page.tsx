
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="container mx-auto max-w-3xl py-8 md:py-12">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-2 mb-2">
            <Shield className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl">Privacy Policy</CardTitle>
          </div>
          <CardDescription>
            Your privacy is important to us. This policy outlines how we handle your information.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 text-foreground/80 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-primary mb-2">Introduction</h2>
            <p>CalcPro ("we", "our", "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website [Your Website URL], including any other media form, media channel, mobile website, or mobile application related or connected thereto (collectively, the "Site"). Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary mb-2">Information We Collect</h2>
            <p>We may collect information about you in a variety of ways. The information we may collect on the Site includes:</p>
            <h3 className="text-lg font-medium text-foreground/90 mt-3 mb-1">Usage Data</h3>
            <p>Our website uses Genkit for AI features and may collect anonymous usage data to improve its services. This includes information such as your browser type, the pages you visit, the time and date of your visit, and other diagnostic data. This data is used in aggregate form and does not personally identify you.</p>
            <h3 className="text-lg font-medium text-foreground/90 mt-3 mb-1">Data You Provide for Calculations</h3>
            <p>The data you input into the calculators on CalcPro is processed locally in your browser or sent to our AI services (for AI-powered features) for the sole purpose of performing the calculation or providing the suggestion. We do not store this input data on our servers after the calculation is performed, unless explicitly stated for a feature like "save calculation history" (which is not currently implemented in a way that stores data long-term on servers).</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary mb-2">Use of Your Information</h2>
            <p>Having accurate information permits us to provide you with a smooth, efficient, and customized experience. Specifically, data entered into calculators is used only for the calculation requested. Anonymous usage data may be used to:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
                <li>Improve our website and offerings.</li>
                <li>Monitor and analyze usage and trends to improve your experience with the Site.</li>
                <li>Enhance the functionality of our AI-powered features.</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-primary mb-2">AI Features and Data</h2>
            <p>Our AI-powered features, such as the "AI Function Suggester" and "AI Math Formula Solver," use Genkit and may interact with third-party AI models (e.g., Google's Gemini). The text or problem descriptions you provide to these AI features are sent to these services to generate suggestions. Please refer to the privacy policies of the underlying AI service providers for how they handle data. We do not store your specific queries for AI suggestions beyond what is necessary for the immediate processing and debugging of the AI service.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary mb-2">Third-Party Websites</h2>
            <p>The Site may contain links to third-party websites and applications of interest, including advertisements and external services, that are not affiliated with us. Once you have used these links to leave the Site, any information you provide to these third parties is not covered by this Privacy Policy, and we cannot guarantee the safety and privacy of your information.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary mb-2">Changes to This Privacy Policy</h2>
            <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary mb-2">Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us through the "Contact Us" page.</p>
          </section>
           <p className="mt-4 text-xs text-muted-foreground">Last updated: [Date]</p>
        </CardContent>
      </Card>
    </div>
  );
}
