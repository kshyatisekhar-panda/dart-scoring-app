import withPWA from '@ducanh2912/next-pwa';
import { readFileSync } from 'fs';

const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // swcMinify is now default in Next.js 16, removed deprecated option
  turbopack: {}, // Enable Turbopack (default in Next.js 16)
  env: {
    APP_VERSION: pkg.version,
  },
};

export default withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  buildExcludes: [/middleware-manifest\.json$/],
})(nextConfig);
