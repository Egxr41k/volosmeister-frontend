import { IProduct } from '@/types/product.interface'
import { useState } from 'react'
import { HiChevronDown, HiChevronUp } from 'react-icons/hi2'

export const ProductIngredients = ({ product }: { product: IProduct }) => {
	const [isShowIngredients, setIsShowIngredients] = useState(true)

	return (
		<div className="text-sm">
			<button
				className="flex items-center gap-2 font-medium"
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
