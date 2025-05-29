import { IReviewFields } from '@/app/product/[slug]/product-reviews/review-fields.interface'
import { ReviewService } from '@/services/review.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useLeaveReview = (productId: number) => {
	const queryClient = useQueryClient()
	const { mutate, isSuccess, isLoading } = useMutation(
		['leave review'],
		(data: IReviewFields) => ReviewService.leave(productId, data),
		{
			onSuccess() {
				queryClient.refetchQueries(['get product', productId])
			}
		}
	)

	return {
		mutate,
		isSuccess,
		isLoading
	}
}
