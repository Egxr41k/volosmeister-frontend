'use client'
import { ProductService } from '@/services/product/product.service'
import { useQuery } from '@tanstack/react-query'
import ProductCard from '../ProductCard'
import Spinner from '../Spinner'

const Admin = () => {
	const {
		isLoading,
		error,
		data: products,
		isSuccess
	} = useQuery({
		queryKey: ['products'],
		queryFn: () => ProductService.getAll()
	})

	const AddProduct = () => {
		//sent "post" query to backend
		//redirect to /admin/products/{createdProductId} (productForm)
	}

	return (
		<div className="flex min-h-[90vh] bg-white md:px-24">
			<div className="m-2.5 h-[768px] w-60 rounded-lg border border-solid border-gray-300">
				<div className="h-[768px] w-60"></div>
			</div>
			{isLoading && <Spinner />}
			{error && <p>Error loading products</p>}
			<div className="flex flex-wrap justify-start">
				{products?.products.map(product => (
					<ProductCard product={product} key={product.id} />
				))}
			</div>
			<button
				onClick={AddProduct}
				className="rounded-md border-0 bg-violet-500 px-4 py-2 font-semibold text-white duration-300 ease-in-out"
			>
				Add product
			</button>
		</div>
	)
}

export default Admin
