import Manufacturer from '@/components/pages/manufacturer-slug/Manufacturer'
import { ManufacturerService } from '@/services/manufacturer.service'
import { ProductService } from '@/services/product.service'
import { IPageSlugParam } from '@/types/page-params'
import { Metadata } from 'next'

export const revalidate = 60

export async function generateStaticParams() {
	const manufacturers = await getManufacturers()
	if (!manufacturers) return []
	return manufacturers.map(manufacturer => {
		return {
			params: { slug: manufacturer.slug }
		}
	})
}

export async function generateMetadata({
	params
}: IPageSlugParam): Promise<Metadata> {
	if (!params?.slug) return {}

	const manufacturer = await getManufacturer(params.slug)
	const products = await getProductsByManufacturer(params.slug)

	if (!manufacturer || !products) {
		return {
			title: 'Products not found',
			description: 'No products found'
		}
	}

	return {
		title: manufacturer.name,
		description: `Random description about ${manufacturer.name}`,
		openGraph: {
			images: products[0]?.images || [],
			description: `Random description about ${manufacturer.name}`
		}
	}
}

export default async function Page({ params }: IPageSlugParam) {
	if (!params?.slug) return <div>Manufacturer not found</div>

	const manufacturer = await getManufacturer(params.slug)
	const products = await getProductsByManufacturer(params.slug)

	return (
		<Manufacturer
			slug={params.slug}
			initialManufacturer={manufacturer}
			initialProducts={products}
		/>
	)
}

async function getManufacturers() {
	try {
		return await ManufacturerService.getAll()
	} catch (error) {
		console.error('Error fetching manufacturers:', error)
		return undefined
	}
}

async function getManufacturer(slug: string) {
	try {
		return await ManufacturerService.getBySlug(slug)
	} catch (error) {
		console.error('Error fetching manufacturer:', error)
		return undefined
	}
}

async function getProductsByManufacturer(slug: string) {
	try {
		return await ProductService.getByManufacturer(slug)
	} catch (error) {
		console.error('Error fetching products by manufacturer:', error)
		return undefined
	}
}
