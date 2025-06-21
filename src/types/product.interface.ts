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
	prices: number[]
	sizes: string[]
	category: ICategory
	manufacturer: IManufacturer
	description: string
	instructionForUse: string
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

export type TypeProductData = {
	name: string
	prices: number[]
	sizes: string[]
	description?: string
	instructionForUse?: string
	images: string[]
	categoryName: string
	manufacturerName: string
	ingredients: string[]
	features: {
		title: string
		image: string
		description: string
	}[]
	properties: {
		name: string
		value: string
	}[]
}

export type TypeProductDataFilters = {
	sort: EnumProductSort | string
	searchTerm?: string
	page?: string | number
	perPage: string | number
	ratings?: string
	minPrice?: string
	maxPrice?: string
	categoriesIds?: string
}

export enum EnumProductSort {
	HIGH_PRICE = 'high-price',
	LOW_PRICE = 'low-price',
	NEWEST = 'newest',
	OLDEST = 'oldest'
}

export type TypeParamsFilters = {
	searchParams: TypeProductDataFilters
}
