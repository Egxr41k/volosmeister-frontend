import { axiosClassic, instance } from '@/api/api.intercepter'
import { IProduct, TypePaginationProducts } from '@/types/product.interface'
import {
	EnumProductSort,
	PRODUCTS,
	TypeProductData,
	TypeProductDataFilters
} from './product.types'

export const ProductService = {
	async getAll(
		queryData = {
			sort: EnumProductSort.NEWEST,
			perPage: ''
		} as TypeProductDataFilters
	) {
		const { data } = await axiosClassic<TypePaginationProducts>({
			url: PRODUCTS,
			method: 'GET',
			params: queryData
		})

		return data
	},

	async getSimilar(productId: string | number) {
		return axiosClassic<IProduct[]>({
			url: `${PRODUCTS}/similar/${productId}`,
			method: 'GET'
		})
	},

	async getBySlug(slug: string) {
		const { data } = await axiosClassic<IProduct>({
			url: `${PRODUCTS}/by-slug/${slug}`,
			method: 'GET'
		})

		return data
	},

	async getByCategory(categorySlug: string) {
		return instance<IProduct[]>({
			url: `${PRODUCTS}/by-category/${categorySlug}`,
			method: 'GET'
		})
	},

	async getById(productId: string | number) {
		return instance<IProduct>({
			url: `${PRODUCTS}/${productId}`,
			method: 'GET'
		})
	},

	async update(productId: string | number, data: TypeProductData) {
		return instance<IProduct>({
			url: `${PRODUCTS}/update/${productId}`,
			method: 'PUT',
			data
		})
	},

	async create(data: TypeProductData) {
		return instance<IProduct>({
			url: `${PRODUCTS}/create`,
			method: 'POST',
			data
		})
	},

	async delete(productId: string | number) {
		return instance<IProduct>({
			url: `${PRODUCTS}/delete/${productId}`,
			method: 'DELETE'
		})
	}
}
