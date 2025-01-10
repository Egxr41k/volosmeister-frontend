import { instance } from '@/api/api.intercepter'

const STATISTICS = '/statistics'

// TODO переделать это плохо!!!!
// вынести в отдельные интерфейсы
export type TypeStatisticsResponse = {
	name: string
	value: number
}[]

export const StatisticsService = {
	async getMain() {
		return instance<TypeStatisticsResponse>({
			url: `${STATISTICS}/main`,
			method: 'GET'
		})
	}
}
