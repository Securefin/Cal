
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Contact Us - CalcPro',
  description: 'Get in touch with the CalcPro team. We welcome your feedback, questions, and suggestions.',
    openGraph: {
    title: 'Contact Us - CalcPro',
    description: 'Get in touch with the CalcPro team for feedback and support.',
    url: '/contact',
  },
};


export default function ContactLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
