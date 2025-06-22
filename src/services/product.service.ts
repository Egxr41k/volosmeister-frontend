import { axiosClassic, instance } from '@/services/api/api.intercepter'
import {
	EnumProductSort,
	IProduct,
	TypePaginationProducts,
	TypeProductData,
	TypeProductDataFilters
} from '@/types/product.interface'

const PRODUCTS = '/products'

export const ProductService = {
	async getAll(
		queryData = {
			sort: EnumProductSort.NEWEST,
			perPage: 4
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
		const { data } = await axiosClassic<IProduct[]>({
			url: `${PRODUCTS}/similar/${productId}`,
			method: 'GET'
		})

		return data
	},

	async getBySlug(slug: string) {
		const { data } = await axiosClassic<IProduct>({
			url: `${PRODUCTS}/by-slug/${slug}`,
			method: 'GET'
		})

		return data
	},

	async getByCategory(categorySlug: string) {
		const { data } = await instance<IProduct[]>({
			url: `${PRODUCTS}/by-category/${categorySlug}`,
			method: 'GET'
		})

		return data
	},

	async getById(productId: string | number) {
		const { data } = await instance<IProduct>({
			url: `${PRODUCTS}/${productId}`,
			method: 'GET'
		})

		return data
	},

	async update(productId: string | number, productdata: TypeProductData) {
		const { data } = await instance<IProduct>({
			url: `${PRODUCTS}/update/${productId}`,
			method: 'PUT',
			data: productdata
		})

		return data
	},

	async create(productdata: TypeProductData) {
		const { data } = await instance<IProduct>({
			url: `${PRODUCTS}/create`,
			method: 'POST',
			data: productdata
		})

		return data
	},

	async delete(productId: string | number) {
		const { data } = await instance<IProduct>({
			url: `${PRODUCTS}/delete/${productId}`,
			method: 'DELETE'
		})

		return data
	}
}
