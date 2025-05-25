import { axiosClassic } from '@/services/api/api.intercepter'
import { sendFileXml } from './send-file-xml'

const baseUrl = process.env.SERVER_URL

export const DataService = {
	async import(file: File) {
		await sendFileXml(file, baseUrl + '/data/import')
	},

	async export() {
		return axiosClassic({
			url: '/data/export',
			method: 'POST',
			responseType: 'blob'
		})
	}
}
