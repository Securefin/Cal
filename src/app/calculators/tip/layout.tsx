
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Tip Calculator - MyAIWork',
  description: 'Easily calculate the tip amount, total bill, and amount per person when dining out or for any service. Supports custom tip percentages.',
  openGraph: {
    title: 'Tip Calculator - MyAIWork',
    description: 'Quickly calculate tips and split bills with our easy-to-use tip calculator.',
    url: '/calculators/tip',
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
