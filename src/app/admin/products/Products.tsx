'use client'

import { FC } from 'react'

import AdminList from '@/ui/admin/admin-list/AdminList'

import { useAdminProducts } from './useAdminProducts'

const Products: FC = () => {
	const { data, isFetching, mutate } = useAdminProducts()

	return (
		<>
			<h1 className="mb-7 text-3xl font-semibold">Products</h1>
			<AdminList
				isLoading={isFetching}
				listItems={data}
				removeHandler={mutate}
			/>
		</>
	)
}

export default Products
