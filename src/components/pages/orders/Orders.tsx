'use client'

import { usePriceConverter } from '@/hooks/usePriceConverter'
import { OrderService } from '@/services/order.service'
import RecomendedProducts from '@/ui/RecomendedProducts'
import { useQuery } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'

export default function Orders() {
	//const profile = useProfile()

	const t = useTranslations('orders')

	const convertPrice = usePriceConverter()

	const { data: orders } = useQuery(['my orders'], () =>
		OrderService.getByUserId()
	)

	if (!orders?.length)
		return <RecomendedProducts title={t('alternativeTitle')} />

	return (
		<main className="flex flex-grow flex-col items-center gap-5 p-6 md:px-24 lg:px-48">
			<h1 className="text-2xl font-semibold lg:text-3xl">{t('title')}</h1>

			{orders.map(order => (
				<div
					key={order.id}
					className="flex flex-col gap-5 rounded-lg bg-white p-7 shadow"
				>
					{order.items.map(item => (
						<h1>{item.product.name}</h1>
					))}

					<p>{order.status}</p>
					<p>{new Date(order.createdAt).toLocaleDateString('ru-RU')}</p>
					<p>{convertPrice(order.total)}</p>
				</div>
			))}
		</main>
	)
}
