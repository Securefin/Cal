
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Scientific Calculator',
  description: 'Perform advanced mathematical and scientific calculations including trigonometric functions, logarithms, powers, roots, and factorials.',
  openGraph: {
    title: 'Scientific Calculator',
    description: 'A powerful online scientific calculator with trigonometric functions, logs, powers, and more.',
    url: '/calculators/scientific',
  },
};

export default function CalculatorLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
