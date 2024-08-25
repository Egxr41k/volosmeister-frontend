'use client'
import { ProductService } from '@/services/product/product.service'
import IProduct from '@/types/data/IProduct'
import { useEffect, useState } from 'react'
import ProductItem from '../../components/ProductItem'
import Spinner from '../../components/Spinner'

const ProductList = () => {
	const [products, setProducts] = useState([] as IProduct[])

	useEffect(() => {
		ProductService.getAll().then(result => {
			if (result?.length != 0) setProducts(result)
			console.log(products)
		})
	}, [])

	return !products || products.length == 0 ? (
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
