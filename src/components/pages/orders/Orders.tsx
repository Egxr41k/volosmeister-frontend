'use client'

import { OrderService } from '@/services/order.service'
import { convertPrice } from '@/utils/convertPrice'
import { useQuery } from '@tanstack/react-query'

export default function Orders() {
	//const profile = useProfile()
	const { data: orders } = useQuery(['my orders'], () =>
		OrderService.getByUserId()
	)

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
