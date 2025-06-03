import { instance } from '@/services/api/api.intercepter'
import { TypeStatisticsResponse } from '@/types/statistics.interface'

const STATISTICS = '/statistics'

export const StatisticsService = {
	async getMain() {
		const { data } = await instance<TypeStatisticsResponse>({
			url: `${STATISTICS}/main`,
			method: 'GET'
		})

		return data
	}
}
