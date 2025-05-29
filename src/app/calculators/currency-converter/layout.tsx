import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Currency Converter (Demo) - CalcPro',
  description: 'Convert between major currencies (USD, EUR, GBP, JPY, INR) using sample exchange rates. For demonstration purposes only.',
};

export default function CalculatorLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
