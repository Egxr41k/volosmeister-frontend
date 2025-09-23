import { instance } from '@/services/api/api.intercepter'

const DATA = '/data'

export const DataService = {
	async import(file: File) {
		const formData = new FormData()
		formData.append('file', file)
		const { data } = await instance<string>({
			headers: {
				'Content-Type': 'multipart/form-data'
			},
			url: `${DATA}/import`,
			method: 'POST',
			data: formData
		})

		return data
	},

	async export() {
		const { data } = await instance<void>({
			url: `${DATA}/export`,
			method: 'POST',
			responseType: 'blob'
		})

		return data
	}
}
