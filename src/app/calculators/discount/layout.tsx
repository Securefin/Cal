import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Discount Calculator - CalcPro',
  description: 'Calculate the final price after a discount and see how much you save. Enter original price and discount percentage.',
};

export default function CalculatorLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
