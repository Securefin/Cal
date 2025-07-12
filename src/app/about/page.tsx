
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Target, Zap, CheckCircle, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: 'About MyAIWork - Our Mission and Creator',
  description: 'Learn about MyAIWork, our mission to simplify AI tool discovery, and the creator behind the platform.',
};

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-4xl py-12 md:py-16">
      <main className="space-y-12 md:space-y-16">
        
        {/* Intro Section */}
        <section className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary">About MyAIWork</h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground leading-relaxed">
            MyAIWork is a curated directory designed to help you discover, compare, and utilize the best and most popular AI tools available today. We streamline the process of finding the right AI for your specific needs, eliminating hours of research and guesswork.
          </p>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground leading-relaxed">
            Whether you are a developer looking for the latest APIs, a student exploring new learning aids, or a content creator seeking to automate your workflow, MyAIWork is your central hub for AI innovation.
          </p>
        </section>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Mission Section */}
          <section>
            <Card className="h-full border-border/40 shadow-sm">
              <CardHeader className="flex-row items-center gap-4">
                <Target className="h-10 w-10 text-primary" />
                <CardTitle as="h2" className="text-2xl font-semibold">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Our mission is to democratize access to artificial intelligence. We believe that everyone should be able to leverage the power of AI without getting lost in the complexity of the rapidly growing landscape. MyAIWork is designed to be an intuitive and comprehensive resource that empowers you to make informed decisions.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Why Choose Us Section */}
          <section>
            <Card className="h-full border-border/40 shadow-sm">
              <CardHeader className="flex-row items-center gap-4">
                <Zap className="h-10 w-10 text-primary" />
                <CardTitle as="h2" className="text-2xl font-semibold">Why Choose Us?</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground"><strong>No Login Required:</strong> Jump straight into discovering tools without the hassle of creating an account.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground"><strong>Lightweight & Fast UI:</strong> A clean, minimal interface that loads quickly and is easy to navigate.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground"><strong>Constantly Updated:</strong> We keep our directory fresh with the latest and most impactful AI tools.</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </section>
        </div>

        {/* Meet the Creator Section */}
        <section className="text-center pt-8">
          <h2 className="text-3xl font-bold tracking-tight">Meet the Creator</h2>
          <div className="mt-8 flex justify-center">
            <Card className="max-w-sm p-6 border-border/40 shadow-sm">
              <div className="flex flex-col items-center text-center">
                <Avatar className="w-28 h-28 mb-4">
                  <AvatarImage data-ai-hint="person portrait" src="https://placehold.co/128x128.png" alt="Akshay Panawlkar" />
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
