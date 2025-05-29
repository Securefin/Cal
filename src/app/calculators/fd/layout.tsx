import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Fixed Deposit (FD) Calculator - CalcPro',
  description: 'Calculate the maturity value and total interest earned on your Fixed Deposit (FD) based on principal, rate, tenure, and compounding frequency.',
};

export default function CalculatorLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
