import { NO_INDEX_PAGE } from '@/constants/app.constants'
import { Metadata } from 'next'
import Dashboard from './Dashboard'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
	title: 'Dashboard',
	...NO_INDEX_PAGE
}

export default function Page() {
	return <Dashboard />
}
