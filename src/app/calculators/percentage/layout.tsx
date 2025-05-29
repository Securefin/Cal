import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Percentage Calculator - CalcPro',
  description: 'Easily calculate percentages: find X% of Y, determine what percentage X is of Y, or calculate percentage increase/decrease.',
};

export default function CalculatorLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
