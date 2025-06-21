import Products from '@/components/pages/admin/products/Products'
import { NO_INDEX_PAGE } from '@/constants/app.constants'
import { Metadata } from 'next'
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
	title: 'Products',
	...NO_INDEX_PAGE
}

export default function Page() {
	return <Products />
}
