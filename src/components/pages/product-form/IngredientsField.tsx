import BorderedBtn from '@/ui/button/BorderedBtn'

interface IIngredientsFields {
	ingredients: string[]
	setIngredients: (value: string[]) => void
}

const IngredientsField = ({
	ingredients,
	setIngredients
}: IIngredientsFields) => {
	const appendIngredient = () => {
		setIngredients([...ingredients, ''])
	}

	const removeIngredient = () => {
		setIngredients(ingredients.filter((_, i) => i !== ingredients.length - 1))
	}

	const setIngredientValue = (value: string, i: number) => {
		const newIngredients = [...ingredients]
		newIngredients[i] = value
		setIngredients(newIngredients)
	}

	return (
		<div className="my-2">
			<div className="flex justify-between">
				<h2 className="my-auto text-lg font-semibold">
					{ingredients.length != 0 ? 'Update ingredients' : 'Add ingredients'}
				</h2>
				<BorderedBtn handleClick={appendIngredient}>+</BorderedBtn>
			</div>
			{ingredients.map((ingredient: string, i: number) => {
				return (
					<div key={i} className="my-2 flex gap-5">
						<input
							className="w-full overflow-hidden rounded-md border border-solid border-gray-300 px-4 py-2 outline-none"
							placeholder={`${i + 1} ingredient name`}
							type="text"
							onChange={event => setIngredientValue(event.target.value, i)}
							value={ingredient}
						/>
						<BorderedBtn handleClick={removeIngredient}>-</BorderedBtn>
					</div>
				)
			})}
		</div>
	)
}

export default IngredientsField
