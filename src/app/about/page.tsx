
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-3xl py-8 md:py-12">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-2 mb-2">
            <Info className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl">About CalcPro</CardTitle>
          </div>
          <CardDescription>
            Understanding our mission, vision, and what makes CalcPro unique.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 text-foreground/80 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">Our Mission</h2>
            <p>
              At CalcPro, our mission is to provide a comprehensive, accessible, and user-friendly suite of calculators
              that cater to a wide array of needs – from basic arithmetic and complex scientific computations to specialized
              financial planning, health and fitness tracking, and engineering solutions. We aim to empower students,
              professionals, and everyday users by simplifying complex calculations and making information readily available.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">Our Vision</h2>
            <p>
              We envision CalcPro as the go-to online resource for accurate and intuitive calculation tools. We are committed
              to continuously expanding our offerings, incorporating innovative features, and
              ensuring our platform remains a reliable and indispensable tool for users worldwide.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">Why Choose CalcPro?</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Versatile Calculators:</strong> A diverse array of calculator types including scientific, financial, health, and engineering tools, with a clean and intuitive interface.
              </li>
              <li>
                <strong>AI-Powered Suggestions:</strong> Smart suggestions to anticipate your needs, providing relevant functions or formulas to enhance calculation accuracy and speed.
              </li>
              <li>
                <strong>Adaptive UI/UX:</strong> Enjoy a seamless experience with responsive layouts, dark/light mode, and custom iconography across all your devices.
              </li>
              <li>
                <strong>Real-time Tracking & History:</strong> (Coming Soon) Real-time display of calculations with options to track calculation history for easy review.
              </li>
              <li>
                <strong>Save & Share Capabilities:</strong> (Coming Soon) Securely save your calculations for later use and share them across different platforms.
              </li>
               <li>
                <strong>Accuracy & Reliability:</strong> Built with precision in mind, providing calculations you can trust for your daily and professional needs.
              </li>
              <li>
                <strong>Free and Accessible:</strong> All our core tools and features are freely available to everyone, everywhere.
              </li>
            </ul>
          </section>
          <p className="mt-8 text-center text-muted-foreground">
            Thank you for choosing CalcPro! We are excited to help you simplify your calculations.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
