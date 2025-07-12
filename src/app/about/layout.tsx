
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'About MyAIWork - Our Mission and Team',
  description: 'Learn about MyAIWork, our mission to simplify AI tool discovery, and the team behind the platform.',
};

export default function AboutLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
