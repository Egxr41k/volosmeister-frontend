import { getSiteUrl } from '@/config/url.config'
import { SITE_NAME } from '@/constants/app.constants'
import Footer from '@/layout/footer/Footer'
import Providers from '@/providers/Providers'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { PropsWithChildren } from 'react'
import Header from '../components/layout/header/Header'
import './globals.scss'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	icons: {
		icon: '/favicon.ico'
	},
	title: {
		absolute: SITE_NAME,
		template: `%s | ${SITE_NAME}`
	},
	metadataBase: new URL(getSiteUrl()),
	openGraph: {
		type: 'website',
		siteName: SITE_NAME,
		emails: ['info@amazon.com']
	}
}

export default function RootLayout({ children }: PropsWithChildren<unknown>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Providers>
					<Header />
					<main className="px-48">{children}</main>
					<Footer />
				</Providers>
				<div id="modal"></div>
			</body>
		</html>
	)
}
