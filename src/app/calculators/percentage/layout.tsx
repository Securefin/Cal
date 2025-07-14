import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Percentage Calculator',
  description: 'Easily calculate percentages: find X% of Y, determine what percentage X is of Y, or calculate percentage increase/decrease.',
  openGraph: {
    title: 'Percentage Calculator',
    description: 'A versatile percentage calculator for all your needs, from simple percentages to increase/decrease calculations.',
    url: '/calculators/percentage',
  },
};

export default function CalculatorLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
