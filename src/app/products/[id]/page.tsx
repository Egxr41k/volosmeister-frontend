import ProductDetails from '@/components/screens/ProductDetails'
import { useRouter } from 'next/router'

export default function ProductDetailsPage() {
	const { query } = useRouter()
	return <ProductDetails id={query.id?.toString() ?? ''} />
}
