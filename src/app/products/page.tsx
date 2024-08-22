'use client'
import ProductItem from '../../components/ProductItem'
import Spinner from '../../components/Spinner'
import useProducts from '../../hooks/useProducts'

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
