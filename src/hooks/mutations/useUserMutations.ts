import { UserService } from '@/services/user.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useToggleFavorite = (productId: number) => {
	const queryClient = useQueryClient()
	const { mutate } = useMutation(
		['toggle favorite'],
		() => UserService.toggleFavorite(productId),
		{
			onSuccess() {
				queryClient.invalidateQueries(['get profile'])
			}
		}
	)

	return { mutate }
}
