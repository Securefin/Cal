import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Tip Calculator - CalcPro',
  description: 'Easily calculate the tip amount, total bill, and amount per person when dining out or for any service. Supports custom tip percentages.',
};

export default function CalculatorLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
