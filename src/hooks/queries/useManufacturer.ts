import { ManufacturerService } from '@/services/manufacturer.service'
import { useQuery } from '@tanstack/react-query'

export const useGetAllManufacturers = () => {
	const { data, isSuccess, refetch } = useQuery({
		queryKey: ['manufacturers'],
		queryFn: () => ManufacturerService.getAll(),
		select: ({ data }) => data
	})

	return {
		data,
		isSuccess,
		refetch
	}
}
