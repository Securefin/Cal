
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Basic Calculator',
  description: 'Perform simple arithmetic operations like addition, subtraction, multiplication, and division with our easy-to-use Basic Calculator.',
  openGraph: {
    title: 'Basic Calculator',
    description: 'Perform simple arithmetic operations with our easy-to-use Basic Calculator.',
    url: '/calculators/basic',
  },
};

export default function CalculatorLayout({
  children,
}: {
  children: ReactNode;
}) {
  // Helper function to get base URL
  const getBaseUrl = () => {
    return process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:9002';
  };
  const baseUrl = getBaseUrl();
  const pageUrl = `${baseUrl}/calculators/basic`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Basic Calculator - CalcPro",
    "description": "Perform simple arithmetic operations like addition, subtraction, multiplication, and division.",
    "applicationCategory": "CalculatorApplication",
    "operatingSystem": "All (Web-based)",
    "browserRequirements": "Requires JavaScript.",
    "url": pageUrl,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": pageUrl
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "potentialAction": {
      "@type": "HowTo",
      "name": "How to use the Basic Calculator",
      "description": "Steps to perform calculations using the CalcPro Basic Calculator.",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Enter First Number",
          "text": "Use the number buttons (0-9) and the decimal point (.) if needed to enter the first operand into the display."
        },
        {
          "@type": "HowToStep",
          "name": "Select Operation",
          "text": "Click on an operation button: + (addition), - (subtraction), * (multiplication), or / (division)."
        },
        {
          "@type": "HowToStep",
          "name": "Enter Second Number",
          "text": "Use the number buttons and decimal point to enter the second operand into the display."
        },
        {
          "@type": "HowToStep",
          "name": "Get Result",
          "text": "Click the '=' button to see the result of the calculation displayed."
        },
        {
          "@type": "HowToStep",
          "name": "Clear",
          "text": "Click the 'AC' (All Clear) button to reset the calculator or 'DEL' (Delete) to remove the last digit."
        }
      ]
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
