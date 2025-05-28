import type { MetadataRoute } from 'next';
import { calculatorCategories } from '@/lib/calculator-data';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'; // Fallback for local dev

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/ai-suggestions`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/calculators`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  const calculatorPages: MetadataRoute.Sitemap = calculatorCategories.flatMap(category =>
    category.calculators
      .filter(calc => calc.isImplemented)
      .map(calc => ({
        url: `${BASE_URL}/calculators/${calc.slug}`,
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: