import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Inflation Calculator - CalcPro',
  description: 'Estimate the future value of money and the impact of inflation over time. Enter initial amount, years, and inflation rate.',
};

export default function CalculatorLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
