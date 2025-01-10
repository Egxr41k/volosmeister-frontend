import { FiChevronRight } from 'react-icons/fi'
import { Link } from 'react-scroll'

import ProductRating from '@/ui/catalog/product-item/ProductRating'

import { IProduct } from '@/types/product.interface'

interface IProductReviews {
	product: IProduct
}

export default function ProductReviewsCount({ product }: IProductReviews) {
	const reviewsLength = product.reviews.length

	if (!reviewsLength) return null

	return (
		<div>
			<ProductRating product={product} />
			<div>
				<Link
					className="cursor-pointer text-sm font-semibold opacity-50"
					to="reviews"
					smooth
					offset={-50}
					duration={1000}
				>
					{reviewsLength} Reviews <FiChevronRight className="inline" />
				</Link>
			</div>
		</div>
	)
}
