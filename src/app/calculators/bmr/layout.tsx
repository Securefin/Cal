import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'BMR Calculator (Mifflin-St Jeor) - CalcPro',
  description: 'Estimate your Basal Metabolic Rate (BMR) - the number of calories your body burns at rest, using the Mifflin-St Jeor Equation.',
};

export default function CalculatorLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
