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
	const { mutate: toggleFavorite } = useMutation(
		['toggle favorite'],
		() => UserService.toggleFavorite(productId),
		{
			onSuccess(data) {
				queryClient.setQueryData(['get profile'], data)
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
					profile ? toggleFavorite() : push('/auth')
				}}
				className="text-primary"
			>
				{isExists ? (
					<AiFillHeart className="text-emerald-500" />
				) : (
					<AiOutlineHeart className="transition-colors duration-300 hover:text-emerald-500" />
				)}
			</button>
		</div>
	)
}

export default FavoriteButton
