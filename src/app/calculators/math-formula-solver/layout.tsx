import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'AI Math Formula Solver - CalcPro',
  description: "Describe your math problem or what formula you need, and our AI will suggest relevant formulas and explain them (e.g., 'area of a circle').",
};

export default function CalculatorLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
