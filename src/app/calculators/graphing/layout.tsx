import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Graphing Calculator (Basic) - CalcPro',
  description: 'Plot mathematical functions of x. Visualize equations like Math.sin(x) or x*x on a 2D graph. Basic version.',
};

export default function CalculatorLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
