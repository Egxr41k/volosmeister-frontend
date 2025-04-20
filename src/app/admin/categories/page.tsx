import { NO_INDEX_PAGE } from '@/constants/app.constants'
import { Metadata } from 'next'
import Categories from './Categories'

export const metadata: Metadata = {
	title: 'Categories',
	...NO_INDEX_PAGE
}

export default function CategoriesPage() {
	return <Categories />
}
