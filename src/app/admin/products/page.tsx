import { NO_INDEX_PAGE } from '@/constants/app.constants'
import { Metadata } from 'next'
import Products from './Products'

export const metadata: Metadata = {
	title: 'Products',
	...NO_INDEX_PAGE
}

export default function ProductPage() {
	return <Products />
}
