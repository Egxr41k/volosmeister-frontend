import { ICategory } from './category.interface'
import { IFeature } from './feature.interface'
import { IManufacturer } from './manufacturer.interface'
import { IProperty } from './property.interface'
import { IReview } from './review.interface'

export interface IProduct {
	id: number
	createAt: Date
	name: string
	slug: string
	images: string[]
	price: number
	category: ICategory
	manufacturer: IManufacturer
	description: string
	instructionForUse: string
	availableSizes: number[]
	ingredients: string[]
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
