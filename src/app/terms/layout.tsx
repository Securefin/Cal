
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Terms of Service - CalcPro',
  description: 'Please read our Terms of Service carefully before using the CalcPro website and its services.',
  openGraph: {
    title: 'Terms of Service - CalcPro',
    description: 'Please read our Terms of Service carefully before using the CalcPro website.',
    url: '/terms',
  },
};

export default function TermsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
