import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Barcode Generator (CODE128) - CalcPro',
  description: 'Generate CODE128 barcodes online. Enter alphanumeric data to create a scannable barcode image. Suitable for various labeling purposes.',
};

export default function CalculatorLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
