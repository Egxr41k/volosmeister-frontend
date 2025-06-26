'use client'

import { useActions } from '@/hooks/useActions'
import { useCart } from '@/hooks/useCart'
import { IAddToCart } from '@/store/cart/cart.types'
import { RiShoppingCartFill, RiShoppingCartLine } from 'react-icons/ri'

const AddToCartButton = ({ product, price, size }: IAddToCart) => {
	const { addToCart, removeFromCart } = useActions()
	const { items } = useCart()

	const currentElement = items.find(
		cartItem => cartItem.product.id === product.id
	)

	return (
		<div>
			<button
				className="text-secondary"
				onClick={() => {
					currentElement
						? removeFromCart({ id: currentElement.id })
						: addToCart({
								product,
								quantity: 1,
								price,
								size
							})
				}}
			>
				{currentElement ? (
					<RiShoppingCartFill className="text-emerald-500" />
				) : (
					<RiShoppingCartLine className="transition-colors duration-300 hover:text-emerald-500" />
				)}
			</button>
		</div>
	)
}

export default AddToCartButton
