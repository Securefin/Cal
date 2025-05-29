import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Random Number Generator - CalcPro',
  description: 'Generate random integers within a specified range (min/max). Choose how many random numbers you need.',
};

export default function CalculatorLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
