import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Blood Pressure Calculator - CalcPro',
  description: 'Enter your systolic and diastolic blood pressure readings to understand your category based on general guidelines. Informational purposes only.',
};

export default function CalculatorLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
