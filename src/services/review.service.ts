import { instance } from '@/services/api/api.intercepter'
import { IReview, TypeReviewData } from '@/types/review.interface'

const REVIEWS = '/reviews'

export const ReviewService = {
	async getAll() {
		return instance<IReview[]>({
			url: REVIEWS,
			method: 'GET'
		})
	},

	async getAverageByProduct(productId: string | number) {
		return instance<number>({
			url: `${REVIEWS}/average-by-product/${productId}`,
			method: 'GET'
		})
	},

	async leave(productId: string | number, data: TypeReviewData) {
		return instance<IReview>({
			url: `${REVIEWS}/leave/${productId}`,
			method: 'POST',
			data
		})
	}
}
