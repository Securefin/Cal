
import type { Metadata } from 'next';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCircle, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: 'About MyAIWork - Our Mission and Creator',
  description: 'Learn about MyAIWork, our mission to simplify AI tool discovery, and the creator behind the platform.',
};

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-5xl py-12 md:py-16 px-4">
      <main className="space-y-16">

        {/* Hero Section */}
        <section className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary">
              About MyAIWork
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              MyAIWork helps users discover, compare, and use trending AI tools all in one place. We bridge the gap between complex AI technology and everyday users.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Whether you're a developer seeking the latest APIs, a student exploring new learning aids, or a content creator looking to automate your workflow, MyAIWork is your central hub for AI innovation.
            </p>
          </div>
          <div className="flex justify-center">
            <Image
              src="https://placehold.co/600x400.png"
              alt="AI Technology"
              data-ai-hint="technology ai"
              width={600}
              height={400}
              className="rounded-lg shadow-lg object-cover"
            />
          </div>
        </section>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Our Mission Section */}
          <section>
            <h2 className="text-3xl font-bold tracking-tight mb-4">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our mission is to democratize access to artificial intelligence. We believe that everyone should be able to leverage the power of AI without getting lost in the complexity of the rapidly growing landscape. MyAIWork is designed to be an intuitive and comprehensive resource that empowers you to make informed decisions and find the perfect tool for your needs.
            </p>
          </section>

          {/* Why Choose Us Section */}
          <section>
            <h2 className="text-3xl font-bold tracking-tight mb-4">Why Choose Us</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                <span className="text-muted-foreground"><strong>Always updated</strong> with the most relevant and trending AI tools.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                <span className="text-muted-foreground"><strong>No login or sign-up required</strong> to browse and discover tools.</span>
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

        {/* Meet the Creator Section */}
        <section className="text-center pt-8">
          <h2 className="text-3xl font-bold tracking-tight">Meet the Creator</h2>
          <div className="mt-8 flex justify-center">
            <Card className="max-w-sm p-6 border-border/40 shadow-sm hover:shadow-lg transition-shadow duration-300">
              <div className="flex flex-col items-center text-center">
                <Avatar className="w-28 h-28 mb-4">
                  <AvatarImage src="https://i.pravatar.cc/150?img=3" alt="Akshay Panawlkar" />
                  <AvatarFallback>AP</AvatarFallback>
                </Avatar>
                <h3 className="text-2xl font-semibold">Akshay Panawlkar</h3>
                <p className="text-primary font-medium">Solo Developer</p>
                <p className="mt-4 text-sm text-muted-foreground flex items-center gap-1.5">
                  Built with <Heart className="h-4 w-4 text-destructive fill-destructive" /> using Next.js, Tailwind, and automation tools.
                </p>
              </div>
            </Card>
          </div>
        </section>

      </main>
    </div>
  );
}
