import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin(); // Point to your config file

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    domains: ['10.0.60.36:8011'],
  },

  locales: ['en', 'fr', 'de', 'es'], // Your supported locales
  defaultLocale: 'en',
  // You can add more configuration options here
  timeZone: 'UTC' // Default timezone
};

export default withNextIntl(nextConfig);