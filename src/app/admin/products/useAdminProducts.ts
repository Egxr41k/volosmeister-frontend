import { getAdminUrl } from '@/config/url.config'
import { ProductService } from '@/services/product/product.service'
import { IListItem } from '@/ui/admin/admin-list/admin-list.interface'
import { formatDate } from '@/utils/format-date'
import { useMutation, useQuery } from '@tanstack/react-query'

export const useAdminProducts = () => {
	const { data, isFetching, refetch } = useQuery(
		['get admin products'],
		() => ProductService.getAll(),
		{
			select: data =>
				data.products.map((product): IListItem => {
					return {
						id: product.id,
						viewUrl: `/product/${product.slug}`,
						editUrl: getAdminUrl(`/products/edit/${product.slug}`),
						items: [
							product.name,
							product.category.name,
							formatDate(product.createAt.toString())
						]
					}
				})
		}
	)

	const { mutate } = useMutation(
		['delete product'],
		(id: number) => ProductService.delete(id),
		{
			onSuccess() {
				refetch
			}
		}
	)

	return {
		mutate,
		data,
		isFetching
	}
}
