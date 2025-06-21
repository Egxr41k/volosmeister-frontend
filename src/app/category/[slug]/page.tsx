import Category from '@/components/pages/category-slug/Category'
import { CategoryService } from '@/services/category.service'
import { ProductService } from '@/services/product.service'
import { IPageSlugParam } from '@/types/page-params'
import { Metadata } from 'next'

export const revalidate = 60

export async function generateStaticParams() {
	const categories = await getCategories()
	if (!categories) return []
	return categories.map(category => {
		return {
			params: { slug: category.slug }
		}
	})
}

export async function generateMetadata({
	params
}: IPageSlugParam): Promise<Metadata> {
	if (!params?.slug) return {}

	const category = await getCategory(params.slug)
	const products = await getProducts(params.slug)

	if (!category || !products) {
		return {
			title: 'Products not found',
			description: 'No products found'
		}
	}

	return {
		title: category.name,
		description: `Random description about ${category.name}`,
		openGraph: {
			images: products[0]?.images || [],
			description: `Random description about ${category.name}`
		}
	}
}

export default async function Page({ params }: IPageSlugParam) {
	if (!params?.slug) return <div>Category not found</div>

	const category = await getCategory(params.slug)
	const products = await getProducts(params.slug)

	return (
		<Category
			slug={params.slug}
			initialCategory={category}
			initialProducts={products}
		/>
	)
}

async function getCategories() {
	try {
		return await CategoryService.getAll()
	} catch (error) {
		console.error('Error fetching categories:', error)
		return undefined
	}
}

async function getCategory(slug: string) {
	try {
		return await CategoryService.getBySlug(slug)
	} catch (error) {
		console.error('Error fetching category:', error)
		return undefined
	}
}

async function getProducts(slug: string) {
	try {
		return await ProductService.getByCategory(slug)
	} catch (error) {
		console.error('Error fetching products:', error)
		return undefined
	}
}
