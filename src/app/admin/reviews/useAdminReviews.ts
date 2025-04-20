import { ReviewService } from '@/services/review.service'
import { IListItem } from '@/ui/admin/admin-list/admin-list.interface'
import { useQuery } from '@tanstack/react-query'

export const useAdminReviews = () => {
	const { data, isFetching, refetch } = useQuery(
		['get admin reviews'],
		() => ReviewService.getAll(),
		{
			select: ({ data }) =>
				data.map((review): IListItem => {
					return {
						id: review.id,
						items: [
							Array.from({ length: review.rating })
								.map(() => '⭐')
								.join(' '),
							review.user.name
						]
					}
				})
		}
	)

	return {
		data,
		isFetching
	}
}
