import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Exponent Calculator - CalcPro',
  description: 'Calculate the result of a base number raised to an exponent (power). Handles positive, negative, and decimal values.',
};

export default function CalculatorLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
