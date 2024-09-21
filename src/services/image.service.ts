const baseUrl = process.env.SERVER_URL

export const ImageService = {
	async saveImage(img: File) {
		return new Promise((resolve, reject) => {
			const formData = new FormData()
			formData.append('image', img)
			console.log(formData)

			const request = new XMLHttpRequest()
			request.open('POST', `${baseUrl}SaveImage`, true)
			request.responseType = 'json'

			request.onload = () => {
				resolve(request.response)
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
		const response = await fetch(`${baseUrl}DeleteImage/${id}`, {
			method: 'DELETE',
			headers: {
				'content-type': 'application/json'
			}
		})
		return response.ok
	}
}
