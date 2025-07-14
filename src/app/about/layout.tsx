
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'About CalcPro - Our Mission and Creator',
  description: 'Learn about MyAIWork, our mission to simplify AI tool discovery, and the creator behind the platform.',
  openGraph: {
    title: 'About MyAIWork - Our Mission and Creator',
    description: 'Learn about MyAIWork, our mission to simplify AI tool discovery, and the creator behind the platform.',
    url: '/about',
  },
};


export default function AboutLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
