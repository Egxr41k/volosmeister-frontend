import { ManufacturerService } from '@/services/manufacturer.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const queryClient = useQueryClient()

export const useCreateManufacturerMutation = () => {
	const { mutate, data } = useMutation({
		mutationFn: (name: string) => ManufacturerService.create(name),
		onSuccess: () => {
			queryClient.invalidateQueries(['manufacturer'])
		},
		onSettled: data => data?.data
	})

	return {
		data,
		mutate
	}
}
