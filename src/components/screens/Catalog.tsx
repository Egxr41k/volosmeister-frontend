'use client'

import { useActions } from '@/hooks/useActions'
import { useAuth } from '@/hooks/useAuth'
import { TypePaginationProducts } from '@/types/product.interface'
import CatalogPagination from '../ui/catalog/CatalogPagination'
import Layout from '../ui/layout/Layout'
import Meta from '../ui/Meta'

const Catalog = ({ products, length }: TypePaginationProducts) => {
	const { user } = useAuth()
	const { logout } = useActions()

	return (
		<Meta title="Home">
			<Layout>
				{!!user && <button onClick={() => logout()}></button>}
				<CatalogPagination
					title="Freshed products"
					data={{ products, length }}
				/>
			</Layout>
		</Meta>
	)
}

export default Catalog
