const baseUrl = process.env.SERVER_URL

export const ImageService = {
	async saveImage(img: File): Promise<string> {
		return new Promise((resolve, reject) => {
			const formData = new FormData()
			formData.append('image', img)
			console.log(formData)

			const request = new XMLHttpRequest()
			request.open('POST', `${baseUrl}/minio/image`, true)
			request.responseType = 'json'

			request.onload = () => {
				resolve(request.response as string)
			}
			request.onerror = () => {
				reject(request.response)
			}
			request.send(formData)
		})
	},

	async checkImageExisting(imageSrc: string) {
		return imageSrc != '' ? (await fetch(imageSrc)).ok : false
	},

	async deleteImage(id: number | string) {
		const response = await fetch(`${baseUrl}/minio/image/${id}`, {
			method: 'DELETE',
			headers: {
				'content-type': 'application/json'
			}
		})
		return response.ok
	}
}
