import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Modulo Calculator - CalcPro',
  description: 'Find the remainder of a division operation (dividend % divisor) with our simple modulo calculator.',
};

export default function CalculatorLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
