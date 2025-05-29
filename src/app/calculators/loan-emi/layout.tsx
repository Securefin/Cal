import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Loan EMI Calculator - CalcPro',
  description: 'Calculate your Equated Monthly Installment (EMI) for loans. See total interest and total payment for home, car, or personal loans.',
};

export default function CalculatorLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
