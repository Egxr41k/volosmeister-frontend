import ProductDetails from '@/components/screens/ProductDetails'
import { NextPage } from 'next'

const ProductDetailsPage: NextPage<{ params: { id: string } }> = params => {
	return <ProductDetails id={params.params.id} />
}

export default ProductDetailsPage
