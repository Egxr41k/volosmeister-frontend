import { IProduct } from '@/types/product.interface'
import { useEffect, useState } from 'react'

export const useFormProduct = (initialProduct?: IProduct) => {
	const [product, setProduct] = useState<IProduct>(
		initialProduct ?? ({} as IProduct)
	)

	useEffect(() => {
		if (initialProduct) {
			setProduct(initialProduct)
		}
	}, [initialProduct])

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
