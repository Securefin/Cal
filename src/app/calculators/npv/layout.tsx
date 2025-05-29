import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'NPV (Net Present Value) Calculator - CalcPro',
  description: 'Calculate the Net Present Value (NPV) of an investment by providing discount rate, initial investment, and future cash flows.',
};

export default function CalculatorLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
