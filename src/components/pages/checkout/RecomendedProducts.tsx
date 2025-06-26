import { ProductService } from '@/services/product.service'
import { IProduct, TypePaginationProducts } from '@/types/product.interface'
import ProductItem from '@/ui/catalog/product-item/ProductItem'
import { useQuery } from '@tanstack/react-query'

const RecomendedProducts = ({
	products,
	excludeProducts = []
}: {
	products?: TypePaginationProducts
} & { excludeProducts: IProduct[] }) => {
	const { data } = useQuery({
		queryKey: ['product checkout'],
		queryFn: () => ProductService.getAll(),
		initialData: products
	})

	return (
		<div>
			<h1 className="mb-6 text-2xl font-semibold">Recomended products</h1>
			<div className="grid grid-cols-2 gap-10">
				{data?.products
					.filter(
						product =>
							!excludeProducts
								.map(excProduct => excProduct.id)
								.includes(product.id)
					)
					.slice(0.2)
					.map(product => <ProductItem product={product} key={product.id} />)}
			</div>
		</div>
	)
}

export default RecomendedProducts
