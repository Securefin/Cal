import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Fraction Calculator - CalcPro',
  description: 'Perform arithmetic operations (add, subtract, multiply, divide) on fractions. Get results in simplified, mixed, and decimal forms.',
};

export default function CalculatorLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
