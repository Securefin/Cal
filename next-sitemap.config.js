/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://mydomain.com/app',
  generateRobotsTxt: true, // (Optional)
  sitemapSize: 7000,
  changefreq: 'weekly',
  priority: 0.7,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    // The sitemap URL will be automatically added by next-sitemap, 
    // pointing to https://mydomain.com/app/sitemap.xml
  },
};