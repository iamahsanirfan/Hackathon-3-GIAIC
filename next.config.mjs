/** @type {import('next').NextConfig} */
// next.config.mjs
export default {
  images: {
    domains: ['cdn.sanity.io'],
  },
};

module.exports = {
  env: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  },
}

module.exports = {
  webpack: (config) => {
    config.resolve.fallback = { 
      ...config.resolve.fallback,
      punycode: false 
    }
    return config
  },
}