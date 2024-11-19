import { NextPage } from 'next'
import ProductForm from './ProductForm'

const ProductFormPage: NextPage<{ params: { id: string } }> = params => {
	return <ProductForm id={params.params.id} />
}

export default ProductFormPage
