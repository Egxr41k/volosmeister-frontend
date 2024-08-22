import { useEffect, useState } from 'react'
import { ProductService } from '../services/product/product.service'
import IProduct from '../types/data/IProduct'

const useProducts = () => {
	const [products, setProducts] = useState([] as IProduct[])

	useEffect(() => {
		ProductService.getAll().then(result => {
			if (result?.length != 0) setProducts(result.products!)
		})
	}, [])

	return products
}

export default useProducts
