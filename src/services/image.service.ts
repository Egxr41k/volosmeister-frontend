const baseUrl = process.env.SERVER_URL

interface IUploadImage {
	message: string
	imageUrl: string
}

export const ImageService = {
	async saveImage(img: File): Promise<any> {
		const formData = new FormData()
		formData.append('file', img)

		try {
			const response = await fetch(`${baseUrl}/minio/image`, {
				method: 'POST',
				body: formData
			})

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`)
			}

			return (await response.json()) as IUploadImage
		} catch (error) {
			console.error('Error uploading image:', error)
			throw error
		}
	},

	async checkImageExisting(imageSrc: string) {
		return imageSrc != '' ? (await fetch(imageSrc)).ok : false
	},

	async deleteImage(id: number | string) {
		const response = await fetch(`${baseUrl}DeleteImage/${id}`, {
			method: 'DELETE',
			headers: {
				'content-type': 'application/json'
			}
		})
		return response.ok
	}
}
