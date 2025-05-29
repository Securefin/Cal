import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Appliance Electricity Cost Calculator - CalcPro',
  description: 'Estimate the monthly cost of running an electrical appliance based on its power (Watts), usage hours, and electricity price per kWh.',
};

export default function CalculatorLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
