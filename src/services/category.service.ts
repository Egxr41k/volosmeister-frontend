import { axiosClassic, instance } from '@/services/api/api.intercepter'
import { ICategory, ICategoryTree } from '@/types/category.interface'

const CATEGORIES = '/categories'

export const CategoryService = {
	async getAll() {
		const { data } = await axiosClassic<ICategory[]>({
			url: CATEGORIES,
			method: 'GET'
		})

		return data
	},

	async getById(id: string | number) {
		const { data } = await axiosClassic<ICategory>({
			url: `${CATEGORIES}/${id}`,
			method: 'GET'
		})

		return data
	},

	async getBySlug(slug: string) {
		const { data } = await axiosClassic<ICategory>({
			url: `${CATEGORIES}/by-slug/${slug}`,
			method: 'GET'
		})

		return data
	},

	async getRoot() {
		const { data } = await axiosClassic<ICategory[]>({
			url: `${CATEGORIES}/root`,
			method: 'GET'
		})

		return data
	},

	async getChildren(parentId: number | string) {
		const { data } = await axiosClassic<ICategory[]>({
			url: `${CATEGORIES}/children/${parentId}`,
			method: 'GET'
		})

		return data
	},

	async getTreeFromLeaf(id: string | number) {
		const { data } = await axiosClassic<ICategoryTree>({
			url: `${CATEGORIES}/tree-from-leaf/${id}`,
			method: 'GET'
		})

		return data
	},

	async getTreeFromRoot(id: string | number) {
		const { data } = await axiosClassic<ICategoryTree>({
			url: `${CATEGORIES}/tree-from-root/${id}`,
			method: 'GET'
		})

		return data
	},

	async create(name: string, parentId?: number | string) {
		const { data } = await instance<ICategory>({
			url: CATEGORIES,
			method: 'POST',
			data: { name, parentId }
		})

		return data
	},

	async update(id: string | number, name: string) {
		const { data } = await instance<ICategory>({
			url: `${CATEGORIES}/${id}`,
			method: 'PUT',
			data: { name }
		})

		return data
	},

	async delete(id: string | number) {
		const { data } = await instance<ICategory>({
			url: `${CATEGORIES}/${id}`,
			method: 'DELETE'
		})

		return data
	}
}
