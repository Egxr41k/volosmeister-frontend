import { CategoryService } from '@/services/category.service'
import { useQuery } from '@tanstack/react-query'

export const useGetAllCategories = () => {
	const { data, isFetching, refetch } = useQuery({
		queryKey: ['get all categories'],
		queryFn: () => CategoryService.getAll(),
		select: ({ data }) => data
	})

	return {
		data,
		isFetching,
		refetch
	}
}

export const useGetRootCategories = () => {
	const { data, isFetching } = useQuery({
		queryKey: ['get root categories'],
		queryFn: () => CategoryService.getRoot(),
		select: ({ data }) => data
	})

	return {
		data,
		isFetching
	}
}
