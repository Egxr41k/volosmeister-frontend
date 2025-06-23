import { IReview } from '@/types/review.interface'
import ProductRating from '@/ui/catalog/product-item/ProductRating'
import { FiChevronRight } from 'react-icons/fi'
import { Link } from 'react-scroll'

interface IProductReviews {
	reviews: IReview[]
}

export default function ProductReviewsCount({ reviews }: IProductReviews) {
	if (!reviews.length) return null

	return (
		<>
			<ProductRating reviews={reviews} />
			<div>
				<Link
					className="cursor-pointer text-sm font-semibold opacity-50"
					to="reviews"
					smooth
					offset={-50}
					duration={1000}
				>
					{reviews.length} Reviews <FiChevronRight className="inline" />
				</Link>
			</div>
		</>
	)
}
