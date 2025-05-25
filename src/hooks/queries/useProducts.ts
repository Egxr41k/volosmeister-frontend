import { ProductService } from '@/services/product.service'
import {
	IProduct,
	TypePaginationProducts,
	TypeProductDataFilters
} from '@/types/product.interface'
import { useQuery } from '@tanstack/react-query'

export const useGetAllProductsQuery = (
	queryParams: TypeProductDataFilters,
	enabled: boolean,
	initialData: TypePaginationProducts
) => {
	const { data, isFetching } = useQuery({
		queryKey: ['product explorer', queryParams],
		queryFn: () => ProductService.getAll(queryParams),
		enabled,
		initialData
	})

	return {
		data,
		isFetching
	}
}

export const useGetProductBySlug = (slug: string, initialData: IProduct) => {
	const { data } = useQuery({
		queryKey: ['get product', slug],
		queryFn: () => ProductService.getBySlug(slug),
		select: data => data,
		enabled: !!slug,
		initialData
	})

	return {
		data
	}
}
