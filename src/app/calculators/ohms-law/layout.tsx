import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: "Ohm's Law Calculator (V=IR) - CalcPro",
  description: "Calculate Voltage (V), Current (I), or Resistance (R) using Ohm's Law. Enter any two values to find the third automatically.",
};

export default function CalculatorLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
