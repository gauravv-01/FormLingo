/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Enable SCSS support
  },
  sassOptions: {
    includePaths: ['./styles'],
  },
}

module.exports = nextConfig
