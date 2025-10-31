/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/Amazon-clone',
  images: {
    unoptimized: true,
    domains: ['images.unsplash.com', 'via.placeholder.com'],
  },
  trailingSlash: true,
};

export default nextConfig;
