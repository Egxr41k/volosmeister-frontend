import '@/assets/styles/globals.scss'
import Footer from '@/components/old-ui/Footer'
import Header from './layout/header/Header'

import { getSiteUrl } from '@/config/url.config'
import { SITE_NAME } from '@/constants/app.constants'
import Providers from '@/providers/Providers'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { PropsWithChildren } from 'react'

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
					{children}
					<Footer />
				</Providers>
				<div id="modal"></div>
			</body>
		</html>
	)
}
