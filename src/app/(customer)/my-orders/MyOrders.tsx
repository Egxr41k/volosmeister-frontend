'use client'

import { useGetOrders } from '@/hooks/queries/useGetOrders'
import { convertPrice } from '@/utils/convertPrice'

export default function MyOrders() {
	const { data: orders } = useGetOrders()

	return (
		<>
			<h1 className="text-3xl font-semibold">My order</h1>

			<section>
				{orders?.length ? (
					orders.map(order => (
						<div
							key={order.id}
							className="my-7 flex gap-10 rounded-lg bg-white p-7 shadow"
						>
							<span>#{order.id}</span>
							<span>{order.status}</span>
							<span>
								{new Date(order.craetedAt).toLocaleDateString('ru-RU')}
							</span>
							<span>{convertPrice(order.total)}</span>
						</div>
					))
				) : (
					<div>Orders not found</div>
				)}
			</section>
		</>
	)
}
