import { NO_INDEX_PAGE } from '@/constants/app.constants'
import { Metadata } from 'next'
import Orders from './Orders'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
	title: 'Orders',
	...NO_INDEX_PAGE
}

export default function Page() {
	return <Orders />
}
