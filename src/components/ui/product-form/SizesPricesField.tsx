import BorderedBtn from '@/ui/button/BorderedBtn'

interface ISizesPricesField {
	sizes: string[]
	setSizes: (value: string[]) => void
	prices: number[]
	setPrices: (value: number[]) => void
}

export const SizesPricesField = ({
	sizes,
	setSizes,
	prices,
	setPrices
}: ISizesPricesField) => {
	const appendSizePrice = () => {
		setSizes([...sizes, ''])
		setPrices([...prices, 0])
	}

	const removeSizePrice = () => {
		setSizes(sizes.filter((_, i) => i !== sizes.length - 1))
		setPrices(prices.filter((_, i) => i !== prices.length - 1))
	}

	const setSizeValue = (value: string, i: number) => {
		const newSizes = [...sizes]
		newSizes[i] = value
		setSizes(newSizes)
	}

	const setPriceValue = (value: string, i: number) => {
		const newPrice = [...prices]
		newPrice[i] = parseInt(value) || 0
		setPrices(newPrice)
	}

	return (
		<div className="my-2">
			<div className="flex justify-between">
				<h2 className="my-auto text-lg font-semibold">
					{sizes.length != 0 ? 'Update sizes' : 'Add sizes'}
				</h2>
				<BorderedBtn handleClick={appendSizePrice}>+</BorderedBtn>
			</div>
			{sizes.map((size: string, i: number) => {
				return (
					<div className="my-2 flex justify-between" key={i}>
						<div className="flex items-center gap-2">
							<input
								className="w-36 rounded-md border border-solid border-gray-300 px-4 py-2 outline-none transition-all placeholder:text-gray-300 focus:border-emerald-500"
								placeholder={`${i + 1} size`}
								type="text"
								onChange={event => setSizeValue(event.target.value, i)}
								value={size || ''}
							/>
							<p>:</p>
							<input
								className="w-36 rounded-md border border-solid border-gray-300 px-4 py-2 outline-none transition-all placeholder:text-gray-300 focus:border-emerald-500"
								placeholder={`${i + 1} price`}
								type="number"
								onChange={event => setPriceValue(event.target.value, i)}
								value={prices[i] || ''}
							/>
						</div>
						<BorderedBtn handleClick={removeSizePrice}>-</BorderedBtn>
					</div>
				)
			})}
		</div>
	)
}
