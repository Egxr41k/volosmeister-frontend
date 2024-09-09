import ProductForm from '@/components/screens/ProductForm'

export default function ProductFormPage({
	params
}: {
	params: { id: string }
}) {
	return <ProductForm id={params.id} />
}
