import ProductForm from '@/components/screens/ProductForm'
import { NextPageAuth, Role } from '@/providers/auth-provider/auth-pages.types'

const ProductFormPage: NextPageAuth<{ params: { id: string } }> = params => {
	return <ProductForm id={params.params.id} />
}

ProductFormPage.isOnlyFor = Role.Admin

export default ProductFormPage
