import { getAdminUrl } from '@/config/url.config'
import { usePriceConverter } from '@/hooks/usePriceConverter'
import { OrderService } from '@/services/order.service'
import { IListItem } from '@/ui/admin/admin-list/admin-list.interface'
import { formatDate } from '@/utils/format-date'
import { useQuery } from '@tanstack/react-query'

export const useAdminOrders = () => {
	const convertPrice = usePriceConverter()

	const { data, isFetching, refetch } = useQuery(
		['get admin orders'],
		() => OrderService.getAll(),
		{
			select: data =>
				data.map((order): IListItem => {
					console.log(order)
					return {
						id: order.id,
						viewUrl: getAdminUrl(`/orders/${order.id}`),
						editUrl: getAdminUrl(`/orders/edit/${order.id}`),
						items: [
							`# ${order.id}`,
							order.status,
							formatDate(order.createdAt),
							convertPrice(order.total)
						]
					}
				})
		}
	)

	return {
		data,
		isFetching
	}
}
