/** @type {import('next').NextConfig} */
const nextConfig = {
  // Build configuration
  output: 'standalone',
  poweredByHeader: false,
  compress: true,
  generateEtags: true,
  
  // Experimental features
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },

  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    domains: [
      'ui-avatars.com',
      'api.dicebear.com',
      'images.unsplash.com',
      'res.cloudinary.com',
      'avatars.githubusercontent.com',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
        pathname: '/api/**',
      },
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
        pathname: '/**',
      },
    ],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Security headers
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
          },
          // CORS for API routes
          {
            key: 'Access-Control-Allow-Origin',
            value: process.env.NODE_ENV === 'production' ? 'https://voar.com' : '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'X-Requested-With, Content-Type, Authorization',
          },
        ],
      },
      // Cache static assets
      {
        source: '/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Cache images
      {
        source: '/_next/image(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // Redirects
  async redirects() {
    return [
      // Redirect root to dashboard if authenticated
      {
        source: '/',
        destination: '/dashboard',
        permanent: false,
        has: [
          {
            type: 'cookie',
            key: 'voar-auth-token',
          },
        ],
      },
      // Legacy route redirects
      {
        source: '/home',
        destination: '/dashboard',
        permanent: true,
      },
      {
        source: '/profile',
        destination: '/settings',
        permanent: true,
      },
      {
        source: '/recordings',
        destination: '/audios',
        permanent: true,
      },
      {
        source: '/analytics',
        destination: '/analise',
        permanent: true,
      },
      {
        source: '/goals',
        destination: '/metas',
        permanent: true,
      },
    ];
  },

  // Rewrites for API proxy (if needed)
  async rewrites() {
    return [
      // Proxy API calls to external service
      {
        source: '/api/v1/:path*',
        destination: process.env.API_BASE_URL 
          ? `${process.env.API_BASE_URL}/:path*`
          : '/api/mock/:path*',
      },
      // Webhook endpoints
      {
        source: '/webhook/:path*',
        destination: '/api/webhook/:path*',
      },
      // Health check
      {
        source: '/health',
        destination: '/api/health',
      },
    ];
  },

  // Webpack configuration
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Custom webpack rules
    config.module.rules.push(
      // Handle SVGs
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack'],
      },
      // Handle audio files
      {
        test: /\.(mp3|wav|ogg)$/,
        type: 'asset/resource',
        generator: {
          filename: 'static/audio/[hash][ext]',
        },
      }
    );

    // Optimize bundle
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: 10,
            enforce: true,
          },
          common: {
            minChunks: 2,
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      };
    }

    // Bundle analyzer (development only)
    if (process.env.ANALYZE === 'true') {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'server',
          analyzerPort: isServer ? 8888 : 8889,
          openAnalyzer: true,
        })
      );
    }

    return config;
  },

  // Environment variables to expose to the client
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
    APP_VERSION: process.env.npm_package_version,
    BUILD_ID: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) || 'dev',
  },

  // Development configuration
  eslint: {
    // Only run ESLint on these directories during build
    dirs: ['src', 'pages', 'components', 'lib'],
    // Don't fail build on ESLint errors in development
    ignoreDuringBuilds: process.env.NODE_ENV === 'development',
  },

  typescript: {
    // Don't fail build on TypeScript errors in development
    ignoreBuildErrors: process.env.NODE_ENV === 'development',
  },

  // Logging
  logging: {
    fetches: {
      fullUrl: true,
    },
  },

  // Compiler options
  compiler: {
    // Remove console.* in production
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },

  // Server runtime config
  serverRuntimeConfig: {
    // Available only on the server side
    mySecret: process.env.MY_SECRET,
  },

  // Public runtime config
  publicRuntimeConfig: {
    // Available on both server and client
    staticFolder: '/static',
  },

  // Internationalization (i18n) - if needed in future
  // i18n: {
  //   locales: ['pt-BR', 'en-US'],
  //   defaultLocale: 'pt-BR',
  //   domains: [
  //     {
  //       domain: 'voar.com.br',
  //       defaultLocale: 'pt-BR',
  //     },
  //     {
  //       domain: 'voar.com',
  //       defaultLocale: 'en-US',
  //     },
  //   ],
  // },

  // Trailing slash
  trailingSlash: false,

  // Base path (if app is served from subdirectory)
  // basePath: '/voar',

  // Asset prefix (for CDN)
  // assetPrefix: process.env.NODE_ENV === 'production' ? 'https://cdn.voar.com' : '',

  // PWA settings (if using next-pwa)
  // pwa: {
  //   dest: 'public',
  //   register: true,
  //   skipWaiting: true,
  //   sw: 'sw.js',
  // },
};

module.exports = nextConfig;