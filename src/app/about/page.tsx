import type { Metadata } from 'next';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCircle, Heart, ArrowRight } from "lucide-react";
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About CalcPro - Our Mission and Creator',
  description: 'Learn about CalcPro, our mission to simplify complex calculations through a suite of powerful, free tools, and the creator behind the platform.',
  openGraph: {
    title: 'About CalcPro - Our Mission and Creator',
    description: 'Learn about CalcPro, our mission to simplify complex calculations, and the creator behind the platform.',
    url: '/about',
    siteName: 'CalcPro',
    type: 'website',
  },
};

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-5xl py-12 md:py-16 px-4">
      <main className="space-y-16">

        <section className="text-center">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary">
              About CalcPro
            </h1>
            <div className="max-w-3xl mx-auto">
                <p className="text-lg text-muted-foreground leading-relaxed">
                CalcPro is dedicated to providing a diverse array of calculators—from scientific and financial to health and engineering—all within a clean, intuitive, and accessible interface.
                </p>
                <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                Whether you're a student tackling homework, a professional managing finances, or a developer needing a quick conversion, CalcPro is your central hub for reliable calculations.
                </p>
            </div>
          </div>
        </section>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <section>
            <h2 className="text-3xl font-bold tracking-tight mb-4">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our mission is to democratize access to powerful calculation tools. We believe that everyone should be able to solve complex problems and make informed decisions without needing to purchase expensive software or sift through clunky websites. CalcPro is designed to be an intuitive and comprehensive resource that empowers you to find the perfect tool for your needs.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold tracking-tight mb-4">Why Choose Us</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                <span className="text-muted-foreground"><strong>Always free</strong>, with no hidden fees or subscriptions.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                <span className="text-muted-foreground"><strong>No login or sign-up required</strong> to browse and use our tools.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                <span className="text-muted-foreground"><strong>Fast, lightweight UI</strong> for a seamless and quick experience.</span>
              </li>
               <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                <span className="text-muted-foreground">Built and maintained by a <strong>passionate indie creator</strong>.</span>
              </li>
            </ul>
          </section>
        </div>

        <section className="text-center pt-8">
          <h2 className="text-3xl font-bold tracking-tight">Meet the Creator</h2>
          <div className="mt-8 flex justify-center">
            <Card className="max-w-sm p-6 border-border/40 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex flex-col items-center text-center">
                <Avatar className="w-28 h-28 mb-4">
                  <AvatarImage src="https://i.pravatar.cc/150?img=5" alt="Akshay Panawlkar" />
                  <AvatarFallback>AP</AvatarFallback>
                </Avatar>
                <h3 className="text-2xl font-semibold">Akshay Panawlkar</h3>
                <p className="text-primary font-medium">Solo Developer</p>
                <p className="mt-4 text-sm text-muted-foreground flex items-center justify-center gap-1.5">
                  Built with <Heart className="h-4 w-4 text-destructive fill-destructive" /> using Next.js, Tailwind, and a love for code.
                </p>
              </div>
            </Card>
          </div>
        </section>

        <section className="text-center pt-12">
            <h2 className="text-2xl font-bold tracking-tight">Ready to Get Started?</h2>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
              Dive into our collection of powerful tools and simplify your complex tasks today.
            </p>
            <div className="mt-6">
                 <Button asChild size="lg" className="group">
                    <Link href="/calculators">
                    Explore Tools <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                </Button>
            </div>
        </section>

      </main>
    </div>
  );
}
