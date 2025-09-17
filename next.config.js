/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: [
      'ui-avatars.com',
      'api.dicebear.com',
    ],
  },
};

module.exports = nextConfig;