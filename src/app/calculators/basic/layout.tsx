import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Basic Calculator - CalcPro',
  description: 'Perform simple arithmetic operations like addition, subtraction, multiplication, and division with our easy-to-use Basic Calculator.',
};

export default function CalculatorLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
