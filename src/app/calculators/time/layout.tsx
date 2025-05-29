import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Time Calculator - CalcPro',
  description: 'Add or subtract time durations (hours, minutes, seconds). Easily calculate resulting time for various operations.',
};

export default function CalculatorLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
