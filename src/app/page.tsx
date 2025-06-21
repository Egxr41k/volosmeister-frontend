import Home from '@/components/pages/home/Home'
import { ProductService } from '@/services/product.service'
import { EnumProductSort } from '@/types/product.interface'
import { Metadata } from 'next'

export const metadata: Metadata = {
	description:
		'Free shopping on milliond of items. get the best of Shopping and Entertainment with Prime'
}

export const dynamic = 'force-dynamic'

export const revalidate = 60

async function getProducts() {
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
	const data = await getProducts()
	return <Home initialProducts={data} />
}
