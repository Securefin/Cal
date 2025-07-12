
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Privacy Policy - MyAIWork',
  description: 'Learn how MyAIWork collects, uses, and protects your data. We are committed to protecting your privacy.',
};

export default function PrivacyLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
