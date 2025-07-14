import type {Metadata} from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { MainLayout } from '@/components/layout/main-layout';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'MyAIWork - Free AI Tools to Boost Your Productivity',
    template: '%s - MyAIWork',
  },
  description: 'Discover and use a curated collection of free AI tools designed to simplify your daily tasks. Boost your productivity with our fast, simple, and open AI solutions.',
  openGraph: {
    title: 'MyAIWork - Free AI Tools to Boost Your Productivity',
    description: 'Discover and use a curated collection of free AI tools designed to simplify your daily tasks.',
    url: 'https://myaiwork.space',
    siteName: 'MyAIWork',
    images: [
      {
        url: 'https://myaiwork.space/og-image.png', // Update with your actual OG image URL
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MyAIWork - Free AI Tools to Boost Your Productivity',
    description: 'Discover and use a curated collection of free AI tools designed to simplify your daily tasks.',
    // images: ['https://myaiwork.space/og-image.png'], // Update with your actual OG image URL
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
       <head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#ffffff" />
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "MyAIWork",
                "url": "https://myaiwork.space",
                "logo": "https://myaiwork.space/logo.png" // Update with your actual logo URL
              })
            }}
          />
        </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
            <MainLayout>
              {children}
            </MainLayout>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}