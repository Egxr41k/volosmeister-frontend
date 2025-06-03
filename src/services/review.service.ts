import { instance } from '@/services/api/api.intercepter'
import { IReview, TypeReviewData } from '@/types/review.interface'

const REVIEWS = '/reviews'

export const ReviewService = {
	async getAll() {
		const { data } = await instance<IReview[]>({
			url: REVIEWS,
			method: 'GET'
		})

		return data
	},

	async getAverageByProduct(productId: string | number) {
		const { data } = await instance<number>({
			url: `${REVIEWS}/average-by-product/${productId}`,
			method: 'GET'
		})

		return data
	},

	async leave(productId: string | number, reviewData: TypeReviewData) {
		const { data } = await instance<IReview>({
			url: `${REVIEWS}/leave/${productId}`,
			method: 'POST',
			data: reviewData
		})

		return data
	}
}
