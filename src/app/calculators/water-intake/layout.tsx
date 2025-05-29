import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Water Intake Calculator - CalcPro',
  description: 'Estimate your daily water intake needs in liters based on your weight and activity level. Stay hydrated!',
};

export default function CalculatorLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
