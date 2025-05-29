import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Unit Converter (Length) - CalcPro',
  description: 'Convert between various length units: meters, kilometers, miles, feet, inches, centimeters, millimeters, and yards. More units coming soon.',
};

export default function CalculatorLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
