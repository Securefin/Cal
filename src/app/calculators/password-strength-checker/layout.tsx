import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Password Strength Checker - CalcPro',
  description: 'Analyze the strength of your password in real-time. Get feedback on length, character types (uppercase, lowercase, numbers, symbols) and tips.',
};

export default function PasswordStrengthCheckerLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
