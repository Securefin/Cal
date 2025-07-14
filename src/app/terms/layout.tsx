
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Terms of Service - MyAIWork',
  description: 'Please read our Terms of Service carefully before using the MyAIWork website and its services.',
  openGraph: {
    title: 'Terms of Service - MyAIWork',
    description: 'Please read our Terms of Service carefully before using the MyAIWork website.',
    url: '/terms',
  },
};

export default function TermsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
