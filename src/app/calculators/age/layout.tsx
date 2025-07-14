
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Age Calculator - MyAIWork',
  description: 'Calculate your age accurately in years, months, and days based on your date of birth. Also calculate age as of a specific date.',
  openGraph: {
    title: 'Age Calculator - MyAIWork',
    description: 'Calculate your age accurately in years, months, and days.',
    url: '/calculators/age',
    siteName: 'MyAIWork',
    type: 'website',
  },
};

export default function CalculatorLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
