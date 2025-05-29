import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Date Difference Calculator - CalcPro',
  description: 'Calculate the duration between two dates. See the difference in years, months, days, and the total number of days.',
};

export default function CalculatorLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
