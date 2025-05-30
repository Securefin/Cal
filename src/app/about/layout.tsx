
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'About CalcPro - Our Mission',
  description: 'Learn more about CalcPro, our mission to provide a comprehensive suite of advanced and user-friendly calculators for various needs.',
};

export default function AboutLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
