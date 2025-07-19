/** @type {import('next').NextConfig} */
const nextConfig = {
  // basePath is the key to subfolder deployment.
  // It prefixes all assets and links with '/app'.
  basePath: '/app',

  // output: 'standalone' is highly recommended for Docker.
  // It creates a minimal server with only necessary dependencies.
  output: 'standalone',
  
  // trailingSlash: true can help with routing consistency in some proxy setups.
  trailingSlash: true,

  // Your existing configurations are preserved below.
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
