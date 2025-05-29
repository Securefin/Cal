import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Average Calculator - CalcPro',
  description: 'Calculate the average (mean) of a list of numbers. Add numbers one by one and get the result instantly.',
};

export default function CalculatorLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
