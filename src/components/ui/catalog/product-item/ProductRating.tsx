import { IReview } from '@/types/review.interface'
import { useState } from 'react'
import { Rating } from 'react-simple-star-rating'

interface IProductRaiteing {
	reviews: IReview[]
	isText?: boolean
}

const ProductRating = ({ reviews, isText = false }: IProductRaiteing) => {
	const [rating, setRating] = useState(
		Math.round(
			reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
		) || 0
	)

	return (
		<div className="mb-2">
			{!!reviews.length && (
				<span className="mr-1">
					<Rating
						readonly
						initialValue={rating}
						SVGstyle={{
							display: 'inline-block'
						}}
						fillColor="#8b5cf6"
						size={20}
						allowFraction
						transition
					/>
					<span style={{ color: '#8b5cf6' }} className="ml-1 pt-1 text-sm">
						{rating}
					</span>
				</span>
			)}
			{isText && <span className="text-xs">({reviews.length} reviews)</span>}
		</div>
	)
}

export default ProductRating
