import IFeature from './IFeature'
import IProperty from './IProperty'

interface IProduct {
	id: number
	name: string
	imageSrc: string
	description: string
	category: string
	count: number
	isAvailable: boolean
	newPrice: number
	oldPrice: number
	isSale: boolean
	features: IFeature[]
	properies: IProperty[]
}

// export interface IProductDetails {
//   product: IProduct;
// }

export type TypeProducts = {
	products: IProduct[]
}

export type TypePaginationProducts = {
	length: number
	products: IProduct[]
}

export default IProduct
