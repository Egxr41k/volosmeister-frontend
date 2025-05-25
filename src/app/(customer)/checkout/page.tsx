import { NO_INDEX_PAGE } from '@/constants/app.constants'
import { ProductService } from '@/services/product.service'
import { EnumProductSort } from '@/types/product.interface'
import { Metadata } from 'next'
import Checkout from './Checkout'

export const metadata: Metadata = {
	title: 'Checkout',
	...NO_INDEX_PAGE
}

export const revalidate = 60

async function getProduts() {
	try {
		const data = await ProductService.getAll({
			page: 1,
			perPage: 4,
			ratings: '',
			sort: EnumProductSort.NEWEST
		})

		return data
	} catch (error) {
		return { products: [], length: 0 }
	}
}

export default async function CheckoutPage() {
	const data = await getProduts()
	return <Checkout products={data.products} />
}
