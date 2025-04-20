'use client'

import AdminList from '@/ui/admin/admin-list/AdminList'
import { useAdminCategories } from './useAdminCategories'

const Categories = () => {
	const { data, isFetching, mutate } = useAdminCategories()

	return (
		<>
			<h1 className="mb-7 text-3xl font-semibold">Categories</h1>
			<AdminList
				isLoading={isFetching}
				listItems={data}
				removeHandler={mutate}
			/>
		</>
	)
}

export default Categories
