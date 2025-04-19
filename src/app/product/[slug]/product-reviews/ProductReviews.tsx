import { useState } from 'react'

import Modal from '@/ui/modal/Modal'

import { useAuth } from '@/hooks/useAuth'

import { IReview } from '@/types/review.interface'

import LeaveReviewForm from './LeaveReviewForm'
import ReviewItem from './ReviewItem'

interface IProductReviews {
	reviews: IReview[]
	productId: number
}

export default function ProductReviews({
	reviews,
	productId
}: IProductReviews) {
	const [isModalOpen, SetModalOpen] = useState(false)
	const { user } = useAuth()

	if (!reviews.length) return null

	return (
		<section id="reviews" className="mt-20">
			<div className="mb-9">
				<h1 className="mb-3 text-3xl font-semibold">Reviews: </h1>
				{user && (
					<button className="text-aqua" onClick={() => SetModalOpen(true)}>
						Leave a review
					</button>
				)}
			</div>

			{user && (
				<Modal isOpen={isModalOpen} closeModal={() => SetModalOpen(false)}>
					<LeaveReviewForm productId={productId} />
				</Modal>
			)}

			<div className="grid grid-cols-4 gap-10">
				{reviews.map(review => (
					<ReviewItem key={review.id} review={review} />
				))}
			</div>
		</section>
	)
}
