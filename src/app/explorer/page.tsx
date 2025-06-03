import { NO_INDEX_PAGE } from '@/constants/app.constants'
import { ProductService } from '@/services/product.service'
import {
	TypeParamsFilters,
	TypeProductDataFilters
} from '@/types/product.interface'
import { Metadata } from 'next'
import ProductExplorer from './ProductExplorer'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
	title: 'Explorer',
	...NO_INDEX_PAGE
}

export const revalidate = 60

export default async function Page({ searchParams }: TypeParamsFilters) {
	const data = await getProducts(searchParams)
	return <ProductExplorer initialProducts={data} />
}

async function getProducts(serchParams: TypeProductDataFilters) {
	try {
		return await ProductService.getAll(serchParams)
	} catch (error) {
		console.error('Error fetching products:', error)
		return undefined
	}
}
