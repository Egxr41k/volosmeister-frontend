import { OrderService } from '@/services/order.service'
import { useQuery } from '@tanstack/react-query'

export const useGetOrders = () => {
	const { data } = useQuery({
		queryKey: ['my orders'],
		queryFn: () => OrderService.getByUserId(),
		select: ({ data }) => data
	})

	return {
		data
	}
}
