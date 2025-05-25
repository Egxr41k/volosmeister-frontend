import { StatisticsService } from '@/services/statistics.service'
import { useQuery } from '@tanstack/react-query'

export const useGetStatistics = () => {
	const { data, isFetching } = useQuery({
		queryKey: ['get statictics'],
		queryFn: () => StatisticsService.getMain(),
		select: ({ data }) => data
	})

	return {
		data,
		isFetching
	}
}
