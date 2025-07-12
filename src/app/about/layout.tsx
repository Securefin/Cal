
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'About CalcPro - Our Mission and Creator',
  description: 'Learn about CalcPro, our mission to simplify AI tool discovery, and the creator behind the platform.',
};

export default function AboutLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
