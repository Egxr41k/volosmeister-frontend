import { NextPage } from 'next'
import ProductDetails from './ProductDetails'

const ProductDetailsPage: NextPage<{ params: { id: string } }> = params => {
	return <ProductDetails id={params.params.id} />
}

export default ProductDetailsPage
