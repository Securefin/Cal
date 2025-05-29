import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'BMI Calculator (Metric) - CalcPro',
  description: 'Calculate your Body Mass Index (BMI) using your weight in kilograms and height in centimeters. Understand your BMI category.',
};

export default function CalculatorLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
