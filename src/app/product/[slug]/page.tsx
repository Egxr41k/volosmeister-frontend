import { ProductService } from '@/services/product.service'
import { IPageSlugParam } from '@/types/page-params'
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

export async function generateMetadata({
	params
}: IPageSlugParam): Promise<Metadata> {
	if (!params?.slug) return {}

	const product = await getProduct(params.slug)

	if (!product) {
		return {
			title: 'Product not found',
			description: 'No product found'
		}
	}

	return {
		title: product.name,
		description: product.description,
		openGraph: {
			images: product.images || [],
			description: product.description
		}
	}
}

export default async function Page({ params }: IPageSlugParam) {
	if (!params?.slug) return <div>Product not found</div>

	const product = await getProduct(params.slug)
	const similarProducts = product ? await getSimilarProducts(product?.id) : []

	return (
		<Product
			initialProduct={product}
			similarProducts={similarProducts}
			slug={params.slug}
		/>
	)
}

async function getProduct(slug: string) {
	try {
		return await ProductService.getBySlug(slug)
	} catch (error) {
		console.error('Error fetching product:', error)
		return undefined
	}
}

async function getSimilarProducts(productId: number) {
	try {
		return await ProductService.getSimilar(productId)
	} catch (error) {
		console.error('Error fetching product:', error)
		return undefined
	}
}
