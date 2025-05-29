import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'PPF Calculator - CalcPro',
  description: 'Estimate the maturity value and interest earned on your Public Provident Fund (PPF) investments with our PPF calculator.',
};

export default function CalculatorLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
