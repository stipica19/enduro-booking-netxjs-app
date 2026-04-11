import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',

  // Kompresija
  compress: true,

  // Optimizacije za slike
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp'],
    // Ograničava veličinu slika za memoriju
    minimumCacheTTL: 3600,
  },

  // Environment varijable
  env: {
    NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET ?? '',
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? '',
  },

  // Optimizacije za memoriju
  experimental: {
    // Bolje treeshaking
    optimizePackageImports: ['lucide-react', '@headlessui/react'],



    // Optimizacija za serverless
    serverMinification: true,
  },

  // Webpack optimizacije
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Smanjuje client bundle
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }

    // Optimizacija za memoriju
    config.optimization.splitChunks = {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    };

    return config;
  },
};

export default nextConfig;