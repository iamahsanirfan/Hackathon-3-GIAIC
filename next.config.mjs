/** @type {import('next').NextConfig} */
export default {
  images: {
    domains: ['cdn.sanity.io'],
  },
  env: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  },
  webpack: (config) => {
    config.resolve.fallback = { 
      ...config.resolve.fallback,
      punycode: false 
    };
    return config;
  }
};