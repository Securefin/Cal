import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Muscle Mass & Body Fat Calculator - CalcPro',
  description: 'Estimate your Body Fat Percentage (BFP) and Lean Body Mass (LBM) using circumference measurements (U.S. Navy method).',
};

export default function CalculatorLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
