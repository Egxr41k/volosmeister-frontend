import { IProduct } from '@/types/product.interface'
import Button from '@/ui/button/Button'
import Link from 'next/link'
import { useState } from 'react'
import { HiChevronDown, HiChevronUp } from 'react-icons/hi2'
import ProductReviewsCount from '../ProductReviewsCount'
import AddToCartInline from './AddToCartInline'

interface IProductInformation {
	product: IProduct
}

export default function ProductInformation({ product }: IProductInformation) {
	//const {} = useCategoryCache()
	const [isShowIngredients, setIsShowIngredients] = useState(true)

	return (
		<div className="flex flex-col gap-4 rounded-lg bg-white p-6">
			<h1 className="text-4xl font-medium">{product.name}</h1>
			<div className="flex gap-1">
				<Link
					href={`manufacturer/${product.manufacturer.name}`}
					className="duration-300 hover:text-emerald-500 hover:underline"
				>
					{product.manufacturer.name}
				</Link>
				<p>:</p>
				<Link
					href={`category/${product.category.slug}`}
					className="duration-300 hover:text-emerald-500 hover:underline"
				>
					{product.category.name}
				</Link>
			</div>

			<p className="text-sm">{product.description}</p>

			<ProductIngredients product={product} />

			<div className="flex gap-5">
				<p className="text-2xl font-medium">{product.prices[0]} грн</p>
				<AddToCartInline product={product} />
				<Button variant="primary">Buy Now</Button>
			</div>

			{/* <FavoriteButton productId={product.id} /> */}
			<ProductReviewsCount reviews={product.reviews} />
		</div>
	)
}

export const ProductIngredients = ({ product }: { product: IProduct }) => {
	const [isShowIngredients, setIsShowIngredients] = useState(true)

	return (
		<div className="text-sm">
			<button
				className="flex items-center gap-2"
				onClick={() => setIsShowIngredients(!isShowIngredients)}
			>
				<p>Ingredients</p>
				{isShowIngredients ? <HiChevronDown /> : <HiChevronUp />}
			</button>

			{isShowIngredients && (
				<ul className="my-2 ml-6 list-disc">
					{product.ingredients.map((ingredient, index) => (
						<li key={index} className="my-1 list-disc">
							{ingredient}
						</li>
					))}
				</ul>
			)}
		</div>
	)
}
