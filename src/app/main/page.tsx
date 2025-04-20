import { ProductService } from '@/services/product/product.service'
import { Metadata } from 'next'
import Main from './Main'

export const metadat: Metadata = {
	description:
		'Free shopping on milliond of items. get the best of Shopping and Entertainment with Prime'
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

export default async function HomePage() {
	const data = await getProduts()
	return <Main products={data.products} length={data.length} />
}
