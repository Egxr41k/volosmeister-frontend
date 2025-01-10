import { ICategory } from '@/types/category.interface'

import { axiosClassic, instance } from '@/api/api.intercepter'

const CATEGORIES = '/categories'

export const CategoryService = {
	async getAll() {
		return axiosClassic<ICategory[]>({
			url: CATEGORIES,
			method: 'GET'
		})
	},

	async getById(id: string | number) {
		return axiosClassic<ICategory>({
			url: `${CATEGORIES}/${id}`,
			method: 'GET'
		})
	},

	async getBySlug(slug: string) {
		return axiosClassic<ICategory>({
			url: `${CATEGORIES}/by-slug/${slug}`,
			method: 'GET'
		})
	},

	async create(name: string) {
		return instance<ICategory>({
			url: CATEGORIES,
			method: 'POST',
			data: { name }
		})
	},

	async update(id: string | number, name: string) {
		return instance<ICategory>({
			url: `${CATEGORIES}/${id}`,
			method: 'PUT',
			data: { name }
		})
	},

	async delete(id: string | number) {
		return instance<ICategory>({
			url: `${CATEGORIES}/${id}`,
			method: 'DELETE'
		})
	}
}
