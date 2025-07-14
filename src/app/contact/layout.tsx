
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Contact Us - MyAIWork',
  description: 'Get in touch with the MyAIWork team. We welcome your feedback, questions, and suggestions.',
    openGraph: {
    title: 'Contact Us - MyAIWork',
    description: 'Get in touch with the MyAIWork team.',
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
