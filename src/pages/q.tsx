import Meta from '@/components/ui/Meta'
import Catalog from '@/components/ui/catalog/Catalog'
import Layout from '@/components/ui/layout/Layout'
import { useQuery } from '@tanstack/react-query'
import { NextPage } from 'next'
import { useParams } from 'next/navigation'

import { ProductService } from '@/services/product/product.service'

const SearchPage: NextPage = () => {
	const params = useParams<{ term: string }>()

	const { data } = useQuery({
		queryKey: ['search products', params?.term],
		queryFn: () => {
			ProductService.getAll({
				searchTerm: params?.term as string
			})
		}
	})

	return (
		<Meta title="Поиск">
			<Layout>
				<Catalog
					products={data || []}
					title={`Поиск по запросу "${params?.term || ''}"`}
				/>
			</Layout>
		</Meta>
	)
}

export default SearchPage
