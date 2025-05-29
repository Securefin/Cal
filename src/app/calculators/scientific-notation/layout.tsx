import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Scientific Notation Calculator - CalcPro',
  description: 'Convert numbers to and from scientific notation (e.g., 1.23e+4 or 1.23 x 10^4) and standard decimal format easily.',
};

export default function CalculatorLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
