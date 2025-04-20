import { IReview } from '@/types/review.interface'
import Image from 'next/image'
import { Rating } from 'react-simple-star-rating'

const ReviewItem = ({ review }: { review: IReview }) => {
	return (
		<div className="rounded-lg bg-white p-6 shadow-md">
			<div className="mb-2 flex items-center">
				<Image
					alt={review.user.name}
					src={review.user.avatarPath}
					width={40}
					height={40}
					className="mr-3 block rounded-full"
				/>
				<span>{review.user.name}</span>
			</div>
			<Rating
				readonly
				initialValue={review.rating}
				SVGstyle={{ display: 'inline-block' }}
				size={20}
				fillColor="#8b5cf6"
				allowFraction
				transition
			/>
			<div className="mt-4 text-sm leading-relaxed">{review.text}</div>
		</div>
	)
}

export default ReviewItem
