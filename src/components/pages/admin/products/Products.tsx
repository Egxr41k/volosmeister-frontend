'use client'

import AdminList from '@/ui/admin/admin-list/AdminList'
import Link from 'next/link'
import { useAdminProducts } from './useAdminProducts'

const Products = () => {
	const { data, isFetching, mutate } = useAdminProducts()

	return (
		<main className="flex-grow p-6 md:px-24 lg:px-48">
			<div className="mb-7 flex items-center justify-between">
				<h1 className="text-3xl font-semibold">Products</h1>
				<Link
					className="rounded-md border-0 bg-emerald-500 px-4 py-2 font-semibold text-white duration-300 ease-in-out"
					href={'/admin/products/create'}
				>
					Add product
				</Link>
			</div>
			<AdminList
				isLoading={isFetching}
				listItems={data}
				removeHandler={mutate}
			/>
		</main>
	)
}

export default Products
