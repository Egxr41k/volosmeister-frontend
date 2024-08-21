import useProducts from '../../hooks/useProducts'
import ProductItem from '../ProductItem'
import Spinner from '../Spinner'

const ProductList = () => {
	const products = useProducts()

	return products.length == 0 ? (
		<Spinner />
	) : (
		<div className="flex flex-wrap items-center justify-center">
			{products.map(item => (
				<ProductItem item={item} key={item.name} />
			))}
		</div>
	)
}

export default ProductList
