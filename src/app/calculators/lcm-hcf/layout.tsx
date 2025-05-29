import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'LCM & HCF Calculator - CalcPro',
  description: 'Calculate the Least Common Multiple (LCM) and Highest Common Factor (HCF/GCD) of two numbers easily with our online tool.',
};

export default function CalculatorLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
