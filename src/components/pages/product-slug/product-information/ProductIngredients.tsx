import { useState } from 'react'
import { HiChevronDown, HiChevronUp } from 'react-icons/hi2'

export const ProductIngredients = ({
	ingredients
}: {
	ingredients: string[]
}) => {
	const [isShowIngredients, setIsShowIngredients] = useState(true)

	if (!ingredients.length) return null

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
					{ingredients.map((ingredient, index) => (
						<li key={index} className="my-1 list-disc">
							{ingredient}
						</li>
					))}
				</ul>
			)}
		</div>
	)
}
