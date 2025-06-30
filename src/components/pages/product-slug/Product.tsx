'use client'

import { ProductService } from '@/services/product.service'
import { IProduct } from '@/types/product.interface'
import { useQuery } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import ProductInformation from './product-information/ProductInformation'
import ProductReviews from './product-reviews/ProductReviews'
import styles from './Product.module.scss'
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

	const t = useTranslations('product')

	if (!product)
		return (
			<div className={styles.error}>
				<h1>{t('error')}</h1>
			</div>
		)

	return (
		<main className={styles.product}>
			<div className={styles.content}>
				<ProductGallery images={product.images} />
				<ProductInformation product={product} />
			</div>

			<ProductFeatures features={product.features ?? []} />
			<ProductProperties properties={product.properties ?? []} />
			<SimilarProducts similarProducts={similarProducts ?? []} />
			<ProductReviews reviews={product.reviews} productId={product.id} />
		</main>
	)
}
