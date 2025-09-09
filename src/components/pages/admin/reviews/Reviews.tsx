'use client'

import AdminList from '@/ui/admin/admin-list/AdminList'
import { useAdminReviews } from './useAdminReviews'

const Reviews = () => {
	const { data, isFetching } = useAdminReviews()

	return (
		<main className="flex-grow p-6 md:px-24 lg:px-48">
			<h1 className="mb-7 text-3xl font-semibold">Reviws</h1>
			<AdminList isLoading={isFetching} listItems={data} />
		</main>
	)
}

export default Reviews
