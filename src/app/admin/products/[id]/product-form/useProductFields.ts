import { IProduct } from '@/types/product.interface'
import { useState } from 'react'

export const useFormProduct = (initialProduct?: IProduct) => {
	const [product, setProduct] = useState<IProduct>(
		initialProduct ?? ({} as IProduct)
	)

	const setProductField = <T extends keyof IProduct>(
		field: T,
		value: IProduct[T]
	) => {
		setProduct(prev => ({
			...prev,
			[field]: value
		}))
	}

	return {
		product,
		setProduct,
		setProductField
	}
}
