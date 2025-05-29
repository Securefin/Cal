import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'SIP Calculator - CalcPro',
  description: 'Estimate the future value of your Systematic Investment Plan (SIP) in mutual funds. Calculate total investment, returns, and maturity amount.',
};

export default function CalculatorLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
