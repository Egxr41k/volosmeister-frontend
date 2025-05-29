import { CategoryService } from '@/services/category.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useCreateCategoryMutation = () => {
	const queryClient = useQueryClient()
	const { mutate } = useMutation({
		mutationFn: (data: { name: string; parentId?: number }) =>
			CategoryService.create(data.name, data.parentId),
		onSuccess: () => {
			queryClient.invalidateQueries(['root categories'])
		}
	})
	return { mutate }
}
