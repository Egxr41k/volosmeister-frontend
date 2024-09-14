import ProductForm from '@/components/screens/ProductForm'
import { NextPage } from 'next'

const ProductFormPage: NextPage<{ params: { id: string } }> = params => {
	return <ProductForm id={params.params.id} />
}

export default ProductFormPage
