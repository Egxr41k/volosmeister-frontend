import { IOrder } from './order.interface'
import { IProduct } from './product.interface'

export interface IUser {
	id: number
	email: string
	name: string
	avatarPath: string
	password: string
	phone: string
}

export interface IFullUser extends IUser {
	favorites: IProduct[]
	orders: IOrder[]
}

export type TypeUserData = {
	email: string
	password?: string
	avatarPath?: string
	phone?: string
	name?: string
}
