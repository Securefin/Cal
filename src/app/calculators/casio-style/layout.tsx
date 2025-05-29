import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Casio-style Scientific Calculator - CalcPro',
  description: 'A comprehensive scientific calculator featuring functions commonly found on Casio models, including trig, logs, powers, and more.',
};

export default function CalculatorLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
