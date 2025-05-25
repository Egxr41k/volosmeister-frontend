import { instance } from '@/api/api.intercepter'
import { TypeStatisticsResponse } from '@/types/statistics.interface'

const STATISTICS = '/statistics'

export const StatisticsService = {
	async getMain() {
		return instance<TypeStatisticsResponse>({
			url: `${STATISTICS}/main`,
			method: 'GET'
		})
	}
}
