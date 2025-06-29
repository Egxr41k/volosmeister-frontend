'use client'

import { usePriceConverter } from '@/hooks/usePriceConverter'
import { OrderService } from '@/services/order.service'
import { useQuery } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'

export default function Orders() {
	//const profile = useProfile()

	const t = useTranslations('orders')

	const convertPrice = usePriceConverter()

	const { data: orders } = useQuery(['my orders'], () =>
		OrderService.getByUserId()
	)

	return (
		<>
			<h1 className="text-3xl font-semibold">{t('title')}</h1>

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
								{new Date(order.createdAt).toLocaleDateString('ru-RU')}
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
