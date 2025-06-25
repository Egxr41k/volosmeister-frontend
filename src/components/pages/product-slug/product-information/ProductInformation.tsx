import { IProduct } from '@/types/product.interface'
import Button from '@/ui/button/Button'
import { convertPrice } from '@/utils/convertPrice'
import Link from 'next/link'
import { useState } from 'react'
import Select from '../../product-form/Select'
import ProductReviewsCount from '../ProductReviewsCount'
import AddToCartInline from './AddToCartInline'
import { ProductIngredients } from './ProductIngredients'

interface IProductInformation {
	product: IProduct
}

interface IPriceSize {
	[key: string]: number
}

export default function ProductInformation({ product }: IProductInformation) {
	const { prices, sizes } = product
	const priceSize: IPriceSize = sizes.reduce((acc, size, index) => {
		acc[size] = prices[index]
		return acc
	}, {} as IPriceSize)

	const [selectedPriceSize, setSelectedPriceSize] = useState<[string, number]>([
		sizes[0],
		priceSize[sizes[0]]
	])

	const handleChangeSize = (selectedSize: string) => {
		setSelectedPriceSize([selectedSize, priceSize[selectedSize]])
	}

	return (
		<div className="flex flex-col gap-4 rounded-lg bg-white p-6">
			<h1 className="text-4xl font-medium">{product.name}</h1>
			<div className="flex gap-1 font-medium">
				<Link
					href={`/manufacturer/${product.manufacturer.slug}`}
					className="duration-300 hover:text-emerald-500 hover:underline"
				>
					{product.manufacturer.name}
				</Link>
				<p>:</p>
				<Link
					href={`/category/${product.category.slug}`}
					className="duration-300 hover:text-emerald-500 hover:underline"
				>
					{product.category.name}
				</Link>
			</div>

			<p className="text-sm">{product.description}</p>

			<ProductIngredients ingredients={product.ingredients} />

			<Select
				placeholder="Choose the correct size"
				options={sizes.map(size => ({
					label: size,
					value: size
				}))}
				value={selectedPriceSize?.[0]}
				onChange={handleChangeSize}
			/>

			<div className="flex gap-5">
				<p className="text-2xl font-medium">
					{convertPrice(selectedPriceSize[1])}
				</p>
				<Button variant="primary">Buy Now</Button>
				<AddToCartInline
					product={product}
					size={selectedPriceSize[0]}
					price={selectedPriceSize[1]}
				/>
			</div>

			{/* <FavoriteButton productId={product.id} /> */}
			<ProductReviewsCount reviews={product.reviews} />
		</div>
	)
}
