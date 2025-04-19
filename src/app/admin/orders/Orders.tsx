'use client'

import { FC } from 'react'

import AdminList from '@/ui/admin/admin-list/AdminList'

import { useAdminOrders } from './useAdminOrders'

const Orders: FC = () => {
	const { data, isFetching } = useAdminOrders()

	return (
		<>
			<h1 className="mb-7 text-3xl font-semibold">Orders</h1>
			<AdminList isLoading={isFetching} listItems={data} />
		</>
	)
}

export default Orders
