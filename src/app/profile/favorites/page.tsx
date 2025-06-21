import { NO_INDEX_PAGE } from '@/constants/app.constants'
import { Metadata } from 'next'
import Favorites from './Favorites'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
	title: 'Favorites',
	...NO_INDEX_PAGE
}

export default function Page() {
	return <Favorites />
}
