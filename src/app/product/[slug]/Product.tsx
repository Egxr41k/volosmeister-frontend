'use client'

import { useGetProductBySlug } from '@/hooks/queries/useProducts'
import { IProduct } from '@/types/product.interface'
import ProductInformation from './product-information/ProductInformation'
import ProductReviews from './product-reviews/ProductReviews'
import ProductFeatures from './ProductFeatures'
import { ProductGallery } from './ProductGallery'
import ProductProperties from './ProductProperties'
import ProductReviewsCount from './ProductReviewsCount'
import SimilarProducts from './SimilarProducts'

interface IProductPage {
	initialProduct: IProduct | undefined
	similarProducts: IProduct[]
	slug?: string
}

export default function Product({
	initialProduct,
	similarProducts,
	slug = ''
}: IProductPage) {
	const { data: product } = useGetProductBySlug(slug, initialProduct)

	return product ? (
		<>
			<h1 className="m-1 text-3xl font-semibold">{product.name}</h1>
			<ProductReviewsCount product={product} />
			<div
				className="mt-6 grid gap-12"
				style={{ gridTemplateColumns: '1fr 1fr 1fr' }}
			>
				<ProductGallery images={product.images} />
				<div className="font-light opacity-80">
					<div className="mb-1 font-semibold">Description:</div>
					{product.description}
				</div>
				<ProductInformation product={product} />
			</div>

			<ProductFeatures features={product.features ?? []} />
			<ProductProperties properties={product.properties ?? []} />
			<SimilarProducts similarProducts={similarProducts} />
			<ProductReviews reviews={product.reviews} productId={product.id} />
		</>
	) : (
		<div className="flex h-full w-full items-center justify-center">
			<h1 className="text-3xl font-semibold">Product not found</h1>
		</div>
	)
}
