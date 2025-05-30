
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="container mx-auto max-w-3xl py-8 md:py-12">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-2 mb-2">
            <FileText className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl">Terms & Conditions</CardTitle>
          </div>
          <CardDescription>
            Please read these terms and conditions carefully before using Our Service.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 text-foreground/80 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-primary mb-2">Interpretation and Definitions</h2>
            <p>The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</p>
            {/* Add more definitions as needed */}
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary mb-2">Acknowledgment</h2>
            <p>These are the Terms and Conditions governing the use of this Service and the agreement that operates between You and CalcPro. These Terms and Conditions set out the rights and obligations of all users regarding the use of the Service.</p>
            <p>Your access to and use of the Service is conditioned on Your acceptance of and compliance with these Terms and Conditions. These Terms and Conditions apply to all visitors, users, and others who access or use the Service.</p>
            <p>By accessing or using the Service You agree to be bound by these Terms and Conditions. If You disagree with any part of these Terms and Conditions then You may not access the Service.</p>
            {/* ... More placeholder content ... */}
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-primary mb-2">Use of Calculators</h2>
            <p>The calculators provided on CalcPro are for informational and estimation purposes only. While we strive for accuracy, we make no warranty or guarantee as to the accuracy, reliability, or completeness of any information or calculations provided.</p>
            <p>You agree to use the calculators at your own risk and acknowledge that CalcPro is not liable for any decisions made based on the results of these calculators. For critical calculations, especially financial or medical, please consult a qualified professional.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary mb-2">Intellectual Property</h2>
            <p>The Service and its original content (excluding Content provided by You or other users), features, and functionality are and will remain the exclusive property of CalcPro and its licensors. The Service is protected by copyright, trademark, and other laws of both the country and foreign countries.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary mb-2">Changes to These Terms and Conditions</h2>
            <p>We reserve the right, at Our sole discretion, to modify or replace these Terms at any time. If a revision is material We will make reasonable efforts to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at Our sole discretion.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary mb-2">Contact Us</h2>
            <p>If you have any questions about these Terms and Conditions, You can contact us by visiting the Contact Us page on our website.</p>
          </section>
          <p className="mt-4 text-xs text-muted-foreground">Last updated: [Date]</p>
        </CardContent>
      </Card>
    </div>
  );
}
