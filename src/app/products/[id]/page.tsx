import ProductDetails from '@/components/screens/ProductDetails'

export default function ProductDetailsPage({
	params
}: {
	params: { id: string }
}) {
	return <ProductDetails id={params.id} />
}
