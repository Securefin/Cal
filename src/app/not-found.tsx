import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { TriangleAlert } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <TriangleAlert className="w-16 h-16 text-destructive mb-4" />
      <h1 className="text-4xl md:text-5xl font-bold">404 - Page Not Found</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>
      <div className="mt-8">
        <Button asChild>
          <Link href="/">Return to Homepage</Link>
        </Button>
      </div>
    </div>
  );
}
