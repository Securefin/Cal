
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'BMI Calculator (Metric)',
  description: 'Calculate your Body Mass Index (BMI) using your weight in kilograms and height in centimeters. Understand your BMI category.',
  openGraph: {
    title: 'BMI Calculator (Metric)',
    description: 'Calculate your Body Mass Index (BMI) using metric units and see where you fall on the health spectrum.',
    url: '/calculators/bmi',
  },
};

export default function CalculatorLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
