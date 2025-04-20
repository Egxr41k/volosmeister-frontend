import { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/app.constants'
import Favorites from './Favorites'

export const metadata: Metadata = {
	title: 'Favorites',
	...NO_INDEX_PAGE
}

export default function FavoritesPage() {
	return <Favorites />
}
