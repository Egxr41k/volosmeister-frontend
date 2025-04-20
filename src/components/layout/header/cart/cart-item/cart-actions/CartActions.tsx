'use client'

import { useActions } from '@/hooks/useActions'
import { useCart } from '@/hooks/useCart'
import { ICartItem } from '@/types/cart.interface'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { FiTrash } from 'react-icons/fi'

const CartActions = ({ item }: { item: ICartItem }) => {
	const { removeFromCart, changeQuantity } = useActions()

	const { items } = useCart()
	const quantity = items.find(cartItem => cartItem.id === item.id)?.quantity

	return (
		<div className="mt-3">
			<div className="flex items-center gap-3">
				<button
					onClick={() => changeQuantity({ id: item.id, type: 'minus' })}
					disabled={quantity === 1}
				>
					<AiOutlineMinus fontSize={13} />
				</button>

				<input
					disabled
					readOnly
					value={quantity}
					className="w-10 text-center"
				/>

				<button onClick={() => changeQuantity({ id: item.id, type: 'plus' })}>
					<AiOutlinePlus fontSize={13} />
				</button>

				<button
					onClick={() => removeFromCart({ id: item.id })}
					className="ml-3"
				>
					<FiTrash />
				</button>
			</div>
		</div>
	)
}

export default CartActions
