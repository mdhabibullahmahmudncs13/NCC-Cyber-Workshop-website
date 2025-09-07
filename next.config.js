/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cloud.appwrite.io', 'localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cloud.appwrite.io',
        port: '',
        pathname: '/v1/storage/buckets/**/files/**/view**',
      },
    ],
  },
  // Optimize builds and enable experimental features
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  // Enable build caching
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  env: {
    NEXT_PUBLIC_APPWRITE_ENDPOINT: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT,
    NEXT_PUBLIC_APPWRITE_PROJECT_ID: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID,
    NEXT_PUBLIC_APPWRITE_DATABASE_ID: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
    NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ID: process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ID,
  },
}

module.exports = nextConfig
