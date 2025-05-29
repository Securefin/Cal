import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Steps to Calories Calculator - CalcPro',
  description: 'Estimate the number of calories burned from walking based on the number of steps taken and your weight.',
};

export default function CalculatorLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
