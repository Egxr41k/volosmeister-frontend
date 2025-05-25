import { CategoryService } from '@/services/category.service'
import { ProductService } from '@/services/product.service'
import { IPageSlugParam, TypeParamSlug } from '@/types/page-params'
import Catalog from '@/ui/catalog/Catalog'
import { Metadata } from 'next'

export const revalidate = 60

export async function generateStaticParams() {
	try {
		const categories = await CategoryService.getAll()

		return categories.data.map(category => {
			return {
				params: { slug: category.slug }
			}
		})
	} catch {
		return []
	}
}

async function getProduts(params: TypeParamSlug) {
	if (!params?.slug) return null

	try {
		const { data: products } = await ProductService.getByCategory(params.slug)

		const { data: category } = await CategoryService.getBySlug(params.slug)

		return {
			products,
			category
		}
	} catch {
		return null
	}
}

export async function generateMetadata({
	params
}: IPageSlugParam): Promise<Metadata> {
	const result = await getProduts(params)

	if (!result?.category) {
		return {
			title: 'Products not found',
			description: 'No products found'
		}
	}

	const { category, products } = result

	return {
		title: category.name,
		description: `Random description about ${category.name}`,
		openGraph: {
			images: products[0]?.images || [],
			description: `Random description about ${category.name}`
		}
	}
}

export default async function CategoryPage({ params }: IPageSlugParam) {
	const data = await getProduts(params)

	return (
		<>
			<Catalog products={data?.products || []} title={data?.category.name} />
		</>
	)
}
