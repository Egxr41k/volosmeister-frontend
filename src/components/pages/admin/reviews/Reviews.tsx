'use client'

import AdminList from '@/ui/admin/admin-list/AdminList'
import { useAdminReviews } from './useAdminReviews'

const Reviews = () => {
	const { data, isFetching } = useAdminReviews()

	return (
		<>
			<h1 className="mb-7 text-3xl font-semibold">Reviws</h1>
			<AdminList isLoading={isFetching} listItems={data} />
		</>
	)
}

export default Reviews
