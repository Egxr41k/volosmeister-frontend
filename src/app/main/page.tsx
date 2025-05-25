import { ProductService } from '@/services/product.service'
import { EnumProductSort } from '@/types/product.interface'
import { Metadata } from 'next'
import Main from './Main'

export const metadata: Metadata = {
	description:
		'Free shopping on milliond of items. get the best of Shopping and Entertainment with Prime'
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

export default async function HomePage() {
	const data = await getProduts()
	return <Main products={data.products} length={data.length} />
}
