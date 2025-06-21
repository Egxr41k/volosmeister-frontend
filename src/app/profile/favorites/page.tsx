import Favorites from '@/components/pages/favorites/Favorites'
import { NO_INDEX_PAGE } from '@/constants/app.constants'
import { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
	title: 'Favorites',
	...NO_INDEX_PAGE
}

export default function Page() {
	return <Favorites />
}
