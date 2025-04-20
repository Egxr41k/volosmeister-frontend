'use client'

import { useProfile } from '@/hooks/useProfile'
import { UserService } from '@/services/user.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

const FavoriteButton = ({ productId }: { productId: number }) => {
	const { profile } = useProfile()

	const { push } = useRouter()

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

	const isExists = profile?.favorites.some(
		favorite => favorite.id === productId
	)

	return (
		<div>
			<button
				onClick={() => {
					profile ? mutate() : push('/auth')
				}}
				className="text-primary"
			>
				{isExists ? <AiFillHeart /> : <AiOutlineHeart />}
			</button>
		</div>
	)
}

export default FavoriteButton
