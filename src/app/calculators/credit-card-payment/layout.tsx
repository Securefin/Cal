import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Credit Card Payment Calculator - CalcPro',
  description: 'Estimate how long it will take to pay off your credit card balance and the total interest paid based on your monthly payments.',
};

export default function CalculatorLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
