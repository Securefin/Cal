
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";

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
            At MyAIWork, we respect your privacy. This policy explains how we collect, use, and protect your data.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 text-foreground/80 leading-relaxed">
          
          <section>
            <h2 className="text-xl font-semibold text-primary mb-2">1. Information We Collect</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>We may collect basic information such as your name and email if you contact us or subscribe.</li>
              <li>We also collect anonymous usage data (like pages visited) to improve the site.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary mb-2">2. How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>To provide and improve our services</li>
              <li>To respond to inquiries or support requests</li>
              <li>To analyze trends and enhance user experience</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary mb-2">3. Cookies and Analytics</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>We may use cookies and third-party tools like Google Analytics to understand user behavior.</li>
              <li>You can disable cookies from your browser settings.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary mb-2">4. Third-Party Links</h2>
            <p>Our site may contain links to third-party websites. We are not responsible for their content or privacy practices.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary mb-2">5. Data Security</h2>
            <p>We use industry-standard measures to protect your data, but no system is 100% secure.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary mb-2">6. Your Rights</h2>
            <p>You can request access to your data or ask us to delete it by emailing support@myaiwork.space</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary mb-2">7. Updates to This Policy</h2>
            <p>This privacy policy may be updated occasionally. We’ll post changes on this page with the “Last updated” date.</p>
          </section>
          
          <div className="border-t pt-4 mt-6 text-sm text-muted-foreground space-y-1">
             <p>📅 <strong>Last Updated:</strong> July 2025</p>
             <p>📧 <strong>Contact:</strong> support@myaiwork.space</p>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}
