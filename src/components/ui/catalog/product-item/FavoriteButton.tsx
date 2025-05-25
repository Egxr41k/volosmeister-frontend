'use client'

import { useToggleFavorite } from '@/hooks/mutations/useUserMutations'
import { useProfile } from '@/hooks/useProfile'
import { useRouter } from 'next/navigation'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

const FavoriteButton = ({ productId }: { productId: number }) => {
	const { profile } = useProfile()

	const { push } = useRouter()

	const { mutate: toggleFavorite } = useToggleFavorite(productId)

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
				{isExists ? <AiFillHeart /> : <AiOutlineHeart />}
			</button>
		</div>
	)
}

export default FavoriteButton
