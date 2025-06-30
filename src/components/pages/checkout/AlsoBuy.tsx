import { ProductService } from '@/services/product.service'
import { IProduct, TypePaginationProducts } from '@/types/product.interface'
import ProductItem from '@/ui/catalog/product-item/ProductItem'
import { useQuery } from '@tanstack/react-query'

interface IAlsoBuy {
	products?: TypePaginationProducts
	excludeProducts?: IProduct[]
}

const AlsoBuy = ({ products, excludeProducts = [] }: IAlsoBuy) => {
	const { data } = useQuery({
		queryKey: ['recomended products'],
		queryFn: () => ProductService.getAll(),
		initialData: products,
		enabled: !products
	})

	return (
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
	)
}

export default AlsoBuy
