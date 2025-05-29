import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Molar Mass Calculator - CalcPro',
  description: 'Calculate the molar mass of a chemical compound (e.g., H2O, C6H12O6) by entering its formula. Uses standard atomic weights.',
};

export default function CalculatorLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
