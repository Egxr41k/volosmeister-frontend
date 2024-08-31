import IProduct from './data/IProduct'

export interface ICartItem {
	id: number
	product: IProduct
	quantity: number
	price: number
}
