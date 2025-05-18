export function sendFileXml(file: File, url: string) {
	return new Promise((resolve, reject) => {
		const formData = new FormData()
		formData.append('file', file)

		const request = new XMLHttpRequest()
		request.open('POST', url, true)
		request.responseType = 'json'

		request.onload = () => {
			resolve(request.response)
		}
		request.onerror = () => {
			reject(request.response)
		}
		request.send(formData)
	})
}
