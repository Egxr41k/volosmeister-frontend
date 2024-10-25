import axios from 'axios'
import IProduct from '../types/IProduct'

const axiosOptions = {
	baseURL: '',
	headers: {
		'Content-Type': 'application/json'
	}
}

export const axiosClassic = axios.create(axiosOptions)

export const ProductService = {
	async getAll() {
		const { data } = await axiosClassic<IProduct[]>({
			url: '/products',
			method: 'GET'
		})

		return data
	},

	async getSimilar(productId: string | number) {
		return axiosClassic<IProduct[]>({
			url: `/products/similar/${productId}`,
			method: 'GET'
		})
	},

	async getBySlug(slug: string) {
		return axiosClassic<IProduct>({
			url: `/products/by-slug/${slug}`,
			method: 'GET'
		})
	},

	async getByCategory(categorySlug: string) {
		return axiosClassic<IProduct[]>({
			url: `/products/by-category/${categorySlug}`,
			method: 'GET'
		})
	},

	async getById(productId: string | number) {
		return axiosClassic<IProduct>({
			url: `/products/${productId}`,
			method: 'GET'
		})
	},

	async update(productId: string | number, data: IProduct) {
		return axiosClassic<IProduct>({
			url: `$/products/update/${productId}`,
			method: 'PUT',
			data
		})
	},

	async create() {
		return axiosClassic<IProduct>({
			url: `$/products/create`,
			method: 'POST'
		})
	},

	async delete(productId: string | number) {
		return axiosClassic<IProduct>({
			url: `$/products/delete/${productId}`,
			method: 'DELETE'
		})
	}
}
