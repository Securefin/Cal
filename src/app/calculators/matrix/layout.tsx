import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Matrix Calculator - CalcPro',
  description: 'Perform basic matrix operations: Addition, Subtraction, and Multiplication. Define matrix dimensions and enter elements to calculate results.',
};

export default function CalculatorLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
