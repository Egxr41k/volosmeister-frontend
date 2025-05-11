import { instance } from '@/api/api.intercepter'

const baseUrl = process.env.SERVER_URL

export const DataService = {
	async import(file: File) {
		return new Promise((resolve, reject) => {
			const formData = new FormData()
			formData.append('file', file)

			const request = new XMLHttpRequest()
			request.open('POST', `${baseUrl}/data/import`, true)
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

	async export() {
		return instance({
			url: '/data/export',
			method: 'POST',
			responseType: 'blob'
		})
	}
}
