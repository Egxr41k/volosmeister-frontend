const createNextIntlPlugin = require('next-intl/plugin')

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	env: {
		SERVER_URL: process.env.SERVER_URL,
		APP_URL: process.env.APP_URL
	},
	async rewrites() {
		return [
			{
				source: '/minio/:path*',
				destination: 'http://localhost:9000/:path*'
			}
		]
	}
}

module.exports = withNextIntl(nextConfig)
