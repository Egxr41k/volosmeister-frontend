import { NO_INDEX_PAGE } from '@/constants/app.constants'
import { Metadata } from 'next'
import Reviews from './Reviews'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
	title: 'Reviews',
	...NO_INDEX_PAGE
}

export default function Page() {
	return <Reviews />
}
