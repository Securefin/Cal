import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'ROI Calculator - CalcPro',
  description: 'Calculate your Return on Investment (ROI) to evaluate the profitability and efficiency of an investment. See net profit and ROI percentage.',
};

export default function CalculatorLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
