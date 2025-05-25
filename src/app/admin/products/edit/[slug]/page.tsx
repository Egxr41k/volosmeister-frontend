import { ProductService } from '@/services/product.service'
import { IPageSlugParam, TypeParamSlug } from '@/types/page-params'
import { Metadata } from 'next'
import ProductForm from '../../../../../components/ui/product-form/ProductForm'

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

async function getProduct(params: TypeParamSlug) {
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
	const { product } = await getProduct(params)
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
	const { product, similarProducts } = await getProduct(params)
	return (
		<ProductForm
			initialProduct={product}
			similarProducts={similarProducts}
			slug={params.slug}
		/>
	)
}
