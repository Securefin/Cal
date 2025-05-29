import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Daily Calorie Calculator (TDEE) - CalcPro',
  description: 'Estimate your Total Daily Energy Expenditure (TDEE) based on BMR and activity level. Find maintenance calories and goals for weight management.',
};

export default function CalculatorLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
