import { IProduct } from '@/types/product.interface'
import ProductItem from '@/ui/catalog/product-item/ProductItem'

interface ISimilarProducs {
	similarProducts: IProduct[]
}

export default function SimilarProducts({ similarProducts }: ISimilarProducs) {
	if (!similarProducts.length) return null

	return (
		<>
			<h1 className="mt-20 text-3xl font-semibold">Similar products:</h1>
			<div className="grid grid-cols-4 gap-10">
				{similarProducts.map(product => (
					<ProductItem key={product.id} product={product} />
				))}
			</div>
		</>
	)
}
