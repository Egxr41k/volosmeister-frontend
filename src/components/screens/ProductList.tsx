'use client'
import ProductCard from '@/components/ProductCard'
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

	return (
		<div className="flex min-h-[90vh] bg-white md:px-24">
			<div className="m-2.5 h-[768px] w-60 rounded-lg border border-solid border-gray-300">
				<div className="h-[768px] w-60"></div>
			</div>
			{isLoading && <Spinner />}
			{error && <p>Error loading products</p>}
			<div className="flex flex-wrap justify-start">
				{products?.map(product => (
					<ProductCard product={product} key={product.id} />
				))}
			</div>
		</div>
	)
}

export default ProductList
