import { Metadata } from 'next'

import { IPageSlugParam, TypeParamSlug } from '@/types/page-params'

import { ProductService } from '@/services/product/product.service'
import Product from './Product'

export const revalidate = 60

export async function generateStaticParams() {
	const response = await ProductService.getAll()

	const paths = response.products.map(product => {
		return {
			params: { slug: product.slug }
		}
	})

	return paths
}

export async function getProdut(params: TypeParamSlug) {
	const product = await ProductService.getBySlug(params?.slug as string)

	const { data: similarProducts } = await ProductService.getSimilar(product.id)

	return {
		product,
		similarProducts
	}
}

export async function generateMetadata({
	params
}: IPageSlugParam): Promise<Metadata> {
	const { product } = await getProdut(params)
	return {
		title: product.name,
		description: product.description,
		openGraph: {
			images: product?.images || [],
			description: product.description
		}
	}
}

export default async function ProductPage({ params }: IPageSlugParam) {
	const { product, similarProducts } = await getProdut(params)

	return (
		<Product
			initialProduct={product}
			similarProducts={similarProducts}
			slug={params.slug}
		/>
	)
}
