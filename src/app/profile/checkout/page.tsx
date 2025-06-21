import Checkout from '@/components/pages/checkout/Checkout'
import { NO_INDEX_PAGE } from '@/constants/app.constants'
import { ProductService } from '@/services/product.service'
import { EnumProductSort } from '@/types/product.interface'
import { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
	title: 'Checkout',
	...NO_INDEX_PAGE
}

export const revalidate = 60

async function getProduts() {
	try {
		return await ProductService.getAll({
			page: 1,
			perPage: 4,
			ratings: '',
			sort: EnumProductSort.NEWEST
		})
	} catch (error) {
		console.error('Error fetching products:', error)
		return undefined
	}
}

export default async function Page() {
	const data = await getProduts()
	return <Checkout products={data} />
}
