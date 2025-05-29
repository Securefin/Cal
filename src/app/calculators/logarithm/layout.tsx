import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Logarithm Calculator - CalcPro',
  description: 'Calculate natural log (ln), common log (log base 10), or logarithm to a custom base with this versatile logarithm tool.',
};

export default function CalculatorLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
