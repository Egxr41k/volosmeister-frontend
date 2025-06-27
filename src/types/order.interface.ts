import { ICartItem } from './cart.interface'
import { IUser } from './user.interface'

interface OrderGuest {
	firstName: string
	lastName: string
	phoneNumber: string
	city: string
	deliveryType: 'nova_poshta' | 'ukr_poshta'
	branchNumber: string
	products: Array<{
		productId: string
		quantity: number
	}>
	status: 'not_confirmed' | 'confirmed' | 'sent' | 'received'
}

export enum EnumOrderStatus {
	PENDING = 'PENDING',
	PAYED = 'PAYED',
	SHIPPED = 'SHIPPED',
	DELIVERED = 'DELIVERED'
}

export interface IOrder {
	id: number
	createAt: string
	items: ICartItem[]
	status: EnumOrderStatus
	total: number
	user: IUser
}

export interface IOrderData {
	items: IOrderItem[]
	firstname: string
	lastname: string
	phone: string
	email: string
	city: string
	novaPoshtaBranchNumber: string
	total: number
}

export interface IOrderItem {
	price: number
	quantity: number
	productId: number
}
