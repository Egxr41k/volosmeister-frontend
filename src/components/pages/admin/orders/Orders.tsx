'use client'

import AdminList from '@/ui/admin/admin-list/AdminList'
import { useAdminOrders } from './useAdminOrders'

const Orders = () => {
	const { data, isFetching } = useAdminOrders()

	return (
		<main className="flex-grow p-6 md:px-24 lg:px-48">
			<h1 className="mb-7 text-3xl font-semibold">Orders</h1>
			<AdminList isLoading={isFetching} listItems={data} />
		</main>
	)
}

export default Orders
