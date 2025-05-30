
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Privacy Policy - CalcPro',
  description: 'Learn about how CalcPro collects, uses, and protects your personal information. Your privacy is important to us.',
};

export default function PrivacyLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
