import { instance } from './api/api.intercepter'

const IMAGE = '/minio/image'

export const ImageService = {
	async save(file: File) {
		const formData = new FormData()
		formData.append('file', file)
		const { data } = await instance<string>({
			headers: {
				'Content-Type': 'multipart/form-data'
			},
			url: IMAGE,
			method: 'POST',
			data: formData
		})

		return data
	},

	async checkExisting(imageSrc: string) {
		return imageSrc != '' ? (await fetch(imageSrc)).ok : false
	},

	async delete(filename: string) {
		const { data } = await instance<void>({
			url: `${IMAGE}/${filename}`,
			method: 'DELETE'
		})

		return data
	}
}
