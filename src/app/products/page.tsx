import Catalog from '@/components/screens/Catalog'
import { ProductService } from '@/services/product/product.service'
import { NextPage } from 'next'

const CatalogPage: NextPage = async () => {
	const data = await ProductService.getAll({
		page: 1,
		perPage: 4
	})
	return <Catalog length={data.length} products={data.products} />
}

export default CatalogPage
