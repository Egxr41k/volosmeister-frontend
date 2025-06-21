import Auth from '@/components/pages/auth/Auth'
import { NO_INDEX_PAGE } from '@/constants/app.constants'
import { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
	title: 'Auth',
	...NO_INDEX_PAGE
}

export default function Page() {
	return <Auth />
}
