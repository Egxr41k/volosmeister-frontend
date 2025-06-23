'use client'

import { ProductService } from '@/services/product.service'
import { IProduct } from '@/types/product.interface'
import { useQuery } from '@tanstack/react-query'
import ProductInformation from './product-information/ProductInformation'
import ProductReviews from './product-reviews/ProductReviews'
import ProductFeatures from './ProductFeatures'
import { ProductGallery } from './ProductGallery'
import ProductProperties from './ProductProperties'
import SimilarProducts from './SimilarProducts'

interface IProductPage {
	initialProduct?: IProduct
	similarProducts?: IProduct[]
	slug?: string
}

export default function Product({
	initialProduct,
	similarProducts,
	slug = ''
}: IProductPage) {
	const { data: product } = useQuery({
		queryKey: ['get product', slug],
		queryFn: () => ProductService.getBySlug(slug),
		enabled: !!slug,
		initialData: initialProduct
	})

	console.log('Product data:', product)

	if (!product)
		return (
			<div className="flex h-full w-full items-center justify-center">
				<h1 className="text-3xl font-semibold">Product not found</h1>
			</div>
		)

	return (
		<>
			<div className="my-10 flex gap-5 sm:flex-wrap lg:flex-nowrap">
				<ProductGallery images={product.images} />
				<ProductInformation product={product} />
			</div>

			<ProductFeatures features={product.features ?? []} />
			<ProductProperties properties={product.properties ?? []} />
			<SimilarProducts similarProducts={similarProducts ?? []} />
			<ProductReviews reviews={product.reviews} productId={product.id} />
		</>
	)
}
