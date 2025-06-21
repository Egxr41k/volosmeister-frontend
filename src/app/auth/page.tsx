import { NO_INDEX_PAGE } from '@/constants/app.constants'
import { Metadata } from 'next'
import Auth from './Auth'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
	title: 'Auth',
	...NO_INDEX_PAGE
}

export default function Page() {
	return <Auth />
}
