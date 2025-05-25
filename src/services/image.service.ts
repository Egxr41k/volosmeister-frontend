import { sendFileXml } from './send-file-xml'

const baseUrl = process.env.SERVER_URL
const endpoint = 'minio/image'
const url = `${baseUrl}/${endpoint}`

export const ImageService = {
	async save(file: File) {
		await sendFileXml(file, url)

		const response = await fetch(`${url}/${file.name}`)
		return await response.text()
	},

	async checkExisting(imageSrc: string) {
		return imageSrc != '' ? (await fetch(imageSrc)).ok : false
	},

	async deleteImage(id: number | string) {
		const response = await fetch(`${url}/${id}`, {
			method: 'DELETE',
			headers: {
				'content-type': 'application/json'
			}
		})
		return response.ok
	}
}
