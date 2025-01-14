/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    SERVER_URL: process.env.SERVER_URL,
    APP_URL: process.env.APP_URL,
  },
  images: { domains: ['i.allo.ua', "example.com"] },

  async rewrites() {
    return [
      {
        source: '/uploads/:path*',
        destination: 'http://localhost:4200/uploads/:path*'
      }
    ]
  }
};

