'use client'

import { OrderService } from '@/services/order.service'
import { IOrder } from '@/types/order.interface'
import { useQuery } from '@tanstack/react-query'

interface IOrderDetails {
	initialOrder?: IOrder
	id: string
}

const OrderDetails = ({ initialOrder, id }: IOrderDetails) => {
	const { data } = useQuery({
		queryKey: ['order'],
		queryFn: () => OrderService.getById(id),
		initialData: initialOrder,
		enabled: !initialOrder
	})

	return (
		<pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
			{JSON.stringify(data, null, 2)}
		</pre>
	)
}

export default OrderDetails
