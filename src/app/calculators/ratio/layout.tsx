import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Ratio Calculator - CalcPro',
  description: 'Solve for an unknown value in a proportion (A : B = C : D). Enter any three values to calculate the fourth.',
};

export default function CalculatorLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
