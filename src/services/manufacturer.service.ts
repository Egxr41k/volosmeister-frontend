import { axiosClassic, instance } from '@/services/api/api.intercepter'
import {
	IManufacturer,
	IManufacturerWithCategoryTree,
	IManufacturerWithRootCategories
} from '@/types/manufacturer.interface'

const MANUFACTURERS = '/manufacturers'

export const ManufacturerService = {
	async getAll() {
		const { data } = await axiosClassic<IManufacturer[]>({
			url: MANUFACTURERS,
			method: 'GET'
		})

		return data
	},

	async getAllWithRootCategories() {
		const { data } = await axiosClassic<IManufacturerWithRootCategories[]>({
			url: `${MANUFACTURERS}/root-categories`,
			method: 'GET'
		})

		return data
	},

	async getAllWithCategoryTree() {
		const { data } = await axiosClassic<IManufacturerWithCategoryTree[]>({
			url: `${MANUFACTURERS}/category-tree`,
			method: 'GET'
		})

		return data
	},

	async getById(id: string | number) {
		const { data } = await axiosClassic<IManufacturer>({
			url: `${MANUFACTURERS}/${id}`,
			method: 'GET'
		})

		return data
	},

	async getBySlug(slug: string) {
		const { data } = await axiosClassic<IManufacturer>({
			url: `${MANUFACTURERS}/by-slug/${slug}`,
			method: 'GET'
		})

		return data
	},

	async create(name: string) {
		const { data } = await instance<IManufacturer>({
			url: MANUFACTURERS,
			method: 'POST',
			data: { name }
		})

		return data
	},

	async update(id: string | number, name: string) {
		const { data } = await instance<IManufacturer>({
			url: `${MANUFACTURERS}/${id}`,
			method: 'PUT',
			data: { name }
		})

		return data
	},

	async delete(id: string | number) {
		const { data } = await instance<IManufacturer>({
			url: `${MANUFACTURERS}/${id}`,
			method: 'DELETE'
		})

		return data
	}
}
