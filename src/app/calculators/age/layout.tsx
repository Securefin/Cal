import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Age Calculator - CalcPro',
  description: 'Calculate your age accurately in years, months, and days based on your date of birth. Also calculate age as of a specific date.',
};

export default function CalculatorLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
