import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Binary/Decimal/Hexadecimal Converter - CalcPro',
  description: 'Convert numbers between binary, decimal, and hexadecimal systems. Enter a value in one base to see its equivalents in others.',
};

export default function CalculatorLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
