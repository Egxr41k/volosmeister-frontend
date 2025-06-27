import { ProductService } from '@/services/product.service'
import { IProduct, TypePaginationProducts } from '@/types/product.interface'
import ProductItem from '@/ui/catalog/product-item/ProductItem'
import { useQuery } from '@tanstack/react-query'
import styles from './Checkout.module.scss'

interface IRecomendedProducts {
	products?: TypePaginationProducts
	excludeProducts: IProduct[]
}

const RecomendedProducts = ({
	products,
	excludeProducts = []
}: IRecomendedProducts) => {
	const { data } = useQuery({
		queryKey: ['product checkout'],
		queryFn: () => ProductService.getAll(),
		initialData: products
	})

	return (
		<>
			<h2 className={styles.header}>Recomended products</h2>
			<div className={styles.recomended}>
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
		</>
	)
}

export default RecomendedProducts
