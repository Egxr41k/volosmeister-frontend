import { ProductService } from '@/services/product.service'
import { IPageSlugParam, TypeParamSlug } from '@/types/page-params'
import { Metadata } from 'next'
import Product from './Product'

export const revalidate = 60

export async function generateStaticParams() {
	try {
		const response = await ProductService.getAll()
		return response.products.map(product => ({
			params: { slug: product.slug }
		}))
	} catch {
		return []
	}
}

async function getProduct(params: TypeParamSlug) {
	if (!params?.slug) return null

	try {
		const product = await ProductService.getBySlug(params.slug)
		const { data: similarProducts } = await ProductService.getSimilar(
			product.id
		)

		return {
			product,
			similarProducts
		}
	} catch {
		return null
	}
}

export async function generateMetadata({
	params
}: IPageSlugParam): Promise<Metadata> {
	const result = await getProduct(params)

	if (!result?.product) {
		return {
			title: 'Product not found',
			description: 'No product found'
		}
	}

	const { product } = result

	return {
		title: product.name,
		description: product.description,
		openGraph: {
			images: product.images || [],
			description: product.description
		}
	}
}

export default async function ProductPage({ params }: IPageSlugParam) {
	const result = await getProduct(params)

	return (
		<Product
			initialProduct={result?.product}
			similarProducts={result?.similarProducts || []}
			slug={params.slug}
		/>
	)
}
