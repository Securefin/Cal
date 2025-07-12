
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, Target, CheckCircle } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-4xl py-8 md:py-12">
      <Card className="shadow-lg border-border/40">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold">About MyAIWork</CardTitle>
          <CardDescription className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
            MyAIWork is your central hub for discovering, comparing, and utilizing the best and most popular AI tools available today. We streamline the process of finding the right AI for your needs, whether you're a developer, a creative professional, or just curious about the future of technology.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-12 pt-8">
          
          <section>
            <div className="flex items-center justify-center gap-3 mb-4">
              <Target className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-semibold text-center">Our Mission</h2>
            </div>
            <p className="text-center text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Our mission is to democratize access to artificial intelligence. We believe that everyone should be able to leverage the power of AI without getting lost in the complexity of the rapidly growing landscape. MyAIWork is designed to be an intuitive and comprehensive resource that empowers users to make informed decisions and seamlessly integrate AI into their workflows.
            </p>
          </section>

          <section>
            <div className="flex items-center justify-center gap-3 mb-6">
                <CheckCircle className="h-8 w-8 text-primary" />
                <h2 className="text-3xl font-semibold text-center">Why Choose Us?</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
              <div className="p-6 bg-muted/50 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Curated Selection</h3>
                <p className="text-muted-foreground">We hand-pick and categorize trending AI tools, so you can easily find high-quality and relevant options.</p>
              </div>
              <div className="p-6 bg-muted/50 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Easy Comparison</h3>
                <p className="text-muted-foreground">Our platform allows for straightforward comparison of features, pricing, and use cases, saving you time and effort.</p>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center justify-center gap-3 mb-6">
              <Users className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-semibold text-center">Meet the Team</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <Avatar className="w-24 h-24 mb-4">
                  <AvatarImage data-ai-hint="person portrait" src="https://placehold.co/128x128.png" alt="Team Member 1" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-semibold">Jane Doe</h3>
                <p className="text-primary">Founder & CEO</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Avatar className="w-24 h-24 mb-4">
                  <AvatarImage data-ai-hint="person portrait" src="https://placehold.co/128x128.png" alt="Team Member 2" />
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-semibold">John Smith</h3>
                <p className="text-primary">Lead Developer</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Avatar className="w-24 h-24 mb-4">
                  <AvatarImage data-ai-hint="person portrait" src="https://placehold.co/128x128.png" alt="Team Member 3" />
                  <AvatarFallback>AS</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-semibold">Alex Smith</h3>
                <p className="text-primary">AI Specialist</p>
              </div>
            </div>
          </section>

        </CardContent>
      </Card>
    </div>
  );
}
