import ProductForm from '@/components/screens/ProductForm'
import { useRouter } from 'next/router'

export default function ProductFormPage() {
	const { query } = useRouter()
	return <ProductForm id={query.id?.toString() ?? ''} />
}
