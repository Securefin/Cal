import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Income Tax Calculator (India, New Regime AY 2025-26) - CalcPro',
  description: 'Estimate your income tax liability in India under the New Tax Regime for Assessment Year 2025-26 (Financial Year 2024-25).',
};

export default function CalculatorLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
