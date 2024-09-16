import { IFeature } from './feature.interface'
import { IProperty } from './property.interface'

import { ICategory } from './category.interface'

export interface IProduct {
	id: number
	image: string
	description: string
	name: string
	price: number
	createAt: Date
	slug: string
	category: ICategory
	// reviews: IReview[];
	features: IFeature[]
	properties: IProperty[]
}

export interface IProductDetails {
	product: IProduct
}

export type TypeProducts = {
	products: IProduct[]
}

export type TypePaginationProducts = {
	length: number
	products: IProduct[]
}
