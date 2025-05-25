import { UserService } from '@/services/user.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const queryClient = useQueryClient()

export const useToggleFavorite = (productId: number) => {
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
