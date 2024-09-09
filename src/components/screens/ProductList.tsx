'use client'
import ProductItem from '@/components/ProductItem'
import Spinner from '@/components/Spinner'
import { ProductService } from '@/services/product/product.service'
import IProduct from '@/types/data/IProduct'
import { useQuery } from '@tanstack/react-query'

const ProductList = () => {
	const {
		isLoading,
		error,
		data: products,
		isSuccess
	} = useQuery<IProduct[]>({
		queryKey: ['products'],
		queryFn: () => ProductService.getAll()
	})

	if (isLoading) return <Spinner />

	if (error) return <p>Error loading products</p>

	return (
		<div className="flex min-h-[90vh] flex-wrap items-center justify-center bg-fuchsia-200">
			{products?.map(item => <ProductItem item={item} key={item.name} />)}
		</div>
	)
}

export default ProductList
