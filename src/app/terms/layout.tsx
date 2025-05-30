
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Terms & Conditions - CalcPro',
  description: 'Please read our Terms and Conditions carefully before using the CalcPro website and its services.',
};

export default function TermsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
