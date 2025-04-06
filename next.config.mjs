import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      unoptimized: true,
      domains: ['10.0.60.36:8011'], 
    },
};

export default withNextIntl(nextConfig);