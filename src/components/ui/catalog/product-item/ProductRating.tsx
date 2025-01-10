import { FC, useState } from 'react'
import { Rating } from 'react-simple-star-rating'

import { IProduct } from '@/types/product.interface'

interface IProductRaiteing {
	product: IProduct
	isText?: boolean
}

const ProductRating: FC<IProductRaiteing> = ({ product, isText = false }) => {
	const [rating, setRating] = useState(
		Math.round(
			product.reviews.reduce((acc, review) => acc + review.rating, 0) /
				product.reviews.length
		) || 0
	)

	return (
		<div className="mb-2">
			{!!product.reviews.length && (
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
			{isText && (
				<span className="text-xs">({product.reviews.length} reviews)</span>
			)}
		</div>
	)
}

export default ProductRating
