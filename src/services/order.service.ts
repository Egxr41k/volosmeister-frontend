import { IOrder, IOrderItem } from '@/types/order.interface'

import { instance } from '@/api/api.intercepter'

const ORDERS = '/reviews'

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

	// async place(data: TypeData) {
	//   return instance<{ confirmation: { confirmatio_url: string } }>({
	//     url: ORDERS,
	//     method: 'POST',
	//     data,
	//   });
	// },

	async place(data: { items: IOrderItem[] }) {
		return instance({
			url: ORDERS,
			method: 'POST',
			data
		})
	}
}
