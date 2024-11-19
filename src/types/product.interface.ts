import { ICategory } from './category.interface'
import { IFeature } from './feature.interface'
import { IProperty } from './property.interface'
import { IReview } from './review.interface'

export interface IProduct {
	id: number
	images: string[]
	description: string
	name: string
	price: number
	createAt: Date
	slug: string
	category: ICategory
	reviews: IReview[]
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
