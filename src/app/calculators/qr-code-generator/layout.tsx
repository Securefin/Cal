import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'QR Code Generator - CalcPro',
  description: 'Create custom QR codes online for URLs, text, contact information, and more. Download your QR code as a PNG image.',
};

export default function CalculatorLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
