import { NO_INDEX_PAGE } from '@/constants/app.constants'
import { ProductService } from '@/services/product/product.service'
import { Metadata } from 'next'
import Checkout from './Checkout'

export const metadata: Metadata = {
	title: 'Checkout',
	...NO_INDEX_PAGE
}

export const revalidate = 60

async function getProduts() {
	const data = await ProductService.getAll({
		page: 1,
		perPage: 4,
		ratings: ''
	})

	return data
}

export default async function CheckoutPage() {
	const data = await getProduts()
	return <Checkout products={data.products} />
}
