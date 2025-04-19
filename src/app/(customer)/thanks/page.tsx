import { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/app.constants'

export const metadata: Metadata = {
	title: 'Thanks',
	...NO_INDEX_PAGE
}

export default function ThanksPage() {
	return <h1 className="text-3xl font-semibold">Thanks!</h1>
}
