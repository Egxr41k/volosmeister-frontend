import { ICartItem } from './cart.interface'
import { IUser } from './user.interface'

export enum EnumOrderStatus {
	PENDING = 'PENDING',
	PAYED = 'PAYED',
	SHIPPED = 'SHIPPED',
	DELIVERED = 'DELIVERED'
}

export interface IOrder {
	id: number
	craetedAt: string
	items: ICartItem[]
	status: EnumOrderStatus
	total: number
	user: IUser
}

export interface IOrderItem {
	price: number
	quantity: number
	productId: number
}
