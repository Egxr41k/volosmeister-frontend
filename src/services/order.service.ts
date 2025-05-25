import { instance } from '@/api/api.intercepter'
import { IOrder, IOrderItem } from '@/types/order.interface'

const ORDERS = '/orders'

export const OrderService = {
	async getAll() {
		return instance<IOrder[]>({
			url: ORDERS,
			method: 'GET'
		})
	},

	async getByUserId() {
		return instance<IOrder[]>({
			url: `${ORDERS}/by-user`,
			method: 'GET'
		})
	},

	async place(data: { items: IOrderItem[] }) {
		return instance({
			url: ORDERS,
			method: 'POST',
			data
		})
	}
}
