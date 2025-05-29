import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Scientific Calculator - CalcPro',
  description: 'Perform advanced mathematical and scientific calculations including trigonometric functions, logarithms, powers, roots, and factorials.',
};

export default function CalculatorLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
