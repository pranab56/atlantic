import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      unoptimized: true,
      domains: ['10.0.60.36:8011'], // Replace with your actual domain (without http/https)
    },
};

export default withNextIntl(nextConfig);