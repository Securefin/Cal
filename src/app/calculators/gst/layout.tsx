import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'GST Calculator - CalcPro',
  description: 'Calculate Goods and Services Tax (GST) by either adding GST to a net amount or removing GST from a gross amount for various GST rates.',
};

export default function CalculatorLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
