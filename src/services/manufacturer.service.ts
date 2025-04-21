import { axiosClassic, instance } from '@/api/api.intercepter'
import { IManufacturer } from '@/types/manufacturer.interface'

const MANUFACTURERS = '/manufacturers'

export const ManufacturerService = {
	async getAll() {
		return axiosClassic<IManufacturer[]>({
			url: MANUFACTURERS,
			method: 'GET'
		})
	},

	async getById(id: string | number) {
		return axiosClassic<IManufacturer>({
			url: `${MANUFACTURERS}/${id}`,
			method: 'GET'
		})
	},

	async getBySlug(slug: string) {
		return axiosClassic<IManufacturer>({
			url: `${MANUFACTURERS}/by-slug/${slug}`,
			method: 'GET'
		})
	},

	async create(name: string) {
		return instance<IManufacturer>({
			url: MANUFACTURERS,
			method: 'POST',
			data: { name }
		})
	},

	async update(id: string | number, name: string) {
		return instance<IManufacturer>({
			url: `${MANUFACTURERS}/${id}`,
			method: 'PUT',
			data: { name }
		})
	},

	async delete(id: string | number) {
		return instance<IManufacturer>({
			url: `${MANUFACTURERS}/${id}`,
			method: 'DELETE'
		})
	}
}
