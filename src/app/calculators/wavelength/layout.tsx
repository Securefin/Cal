import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Wavelength & Frequency Calculator (Light) - CalcPro',
  description: "Calculate wavelength (meters) or frequency (Hertz) of electromagnetic waves using the speed of light (c = λf). Input one value to find the other.",
};

export default function CalculatorLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
