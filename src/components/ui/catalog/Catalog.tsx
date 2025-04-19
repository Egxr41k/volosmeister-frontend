'use client'

import { FC } from 'react'

import { IProduct } from '@/types/product.interface'

import ProductItem from './product-item/ProductItem'
import Spinner from '@/ui/Spinner'

interface ICatalog {
	products: IProduct[]
	isLoading?: boolean
	title?: string
}

const Catalog: FC<ICatalog> = ({ products, isLoading, title }) => {
	if (isLoading) return <Spinner />

	return (
		<section>
			{title && <h1 className="mb-5 text-3xl font-semibold">{title}</h1>}
			{products.length ? (
				<>
					<div className="grid grid-cols-4 gap-10">
						{products.map(product => (
							<ProductItem key={product.id} product={product} />
						))}
					</div>
				</>
			) : (
				<div>There are no products</div>
			)}
		</section>
	)
}

export default Catalog
