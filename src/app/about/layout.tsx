import type { ReactNode } from 'react';

// Metadata is now in page.tsx for better specificity

export default function AboutLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
