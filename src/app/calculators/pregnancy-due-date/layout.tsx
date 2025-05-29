import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Pregnancy Due Date Calculator - CalcPro',
  description: "Estimate your baby's due date based on the first day of your last menstrual period (LMP) using Naegele's rule.",
};

export default function CalculatorLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
