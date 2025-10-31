/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // For GitHub Pages deployment
  basePath: process.env.NODE_ENV === 'production' ? '/Amazon-clone' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/Amazon-clone/' : '',
}

module.exports = nextConfig
