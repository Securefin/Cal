import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Password Generator - CalcPro',
  description: 'Create strong, secure, and random passwords based on customizable options like length, and inclusion of uppercase, lowercase, numbers, and symbols.',
};

export default function CalculatorLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
