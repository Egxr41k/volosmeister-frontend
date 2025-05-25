import { axiosClassic, instance } from '@/api/api.intercepter'
import { ICategory, ICategoryTree } from '@/types/category.interface'

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

	async getRoot() {
		return axiosClassic<ICategory[]>({
			url: `${CATEGORIES}/root`,
			method: 'GET'
		})
	},

	async getChildren(parentId: number | string) {
		return axiosClassic<ICategory[]>({
			url: `${CATEGORIES}/children/${parentId}`,
			method: 'GET'
		})
	},

	async getTreeFromLeaf(id: string | number) {
		return axiosClassic<ICategoryTree>({
			url: `${CATEGORIES}/tree-from-leaf/${id}`,
			method: 'GET'
		})
	},

	async getTreeFromRoot(id: string | number) {
		return axiosClassic<ICategoryTree>({
			url: `${CATEGORIES}/tree-from-root/${id}`,
			method: 'GET'
		})
	},

	async create(name: string, parentId?: number | string) {
		return instance<ICategory>({
			url: CATEGORIES,
			method: 'POST',
			data: { name, parentId }
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
