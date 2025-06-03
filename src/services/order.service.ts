import { instance } from '@/services/api/api.intercepter'
import { IOrder, IOrderItem } from '@/types/order.interface'

const ORDERS = '/orders'

export const OrderService = {
	async getAll() {
		const { data } = await instance<IOrder[]>({
			url: ORDERS,
			method: 'GET'
		})

		return data
	},

	async getByUserId() {
		const { data } = await instance<IOrder[]>({
			url: `${ORDERS}/by-user`,
			method: 'GET'
		})

		return data
	},

	async place(orderData: { items: IOrderItem[] }) {
		const { data } = await instance<IOrder>({
			url: ORDERS,
			method: 'POST',
			data: orderData
		})

		return data
	}
}
