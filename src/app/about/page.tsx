
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
            Understanding our mission and vision.
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
              to continuously expanding our offerings, incorporating innovative features like AI-powered suggestions, and
              ensuring our platform remains a reliable and indispensable tool for users worldwide.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">Why CalcPro?</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Versatility:</strong> A diverse range of calculators under one roof.
              </li>
              <li>
                <strong>Accuracy:</strong> Reliable calculations you can trust.
              </li>
              <li>
                <strong>User-Friendly:</strong> Clean, intuitive interface designed for ease of use on all devices.
              </li>
              <li>
                <strong>Innovation:</strong> Features like AI suggestions to enhance your productivity.
              </li>
              <li>
                <strong>Free Access:</strong> All our tools are freely available to everyone.
              </li>
            </ul>
          </section>
          <p className="mt-8 text-center text-muted-foreground">
            Thank you for choosing CalcPro!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
