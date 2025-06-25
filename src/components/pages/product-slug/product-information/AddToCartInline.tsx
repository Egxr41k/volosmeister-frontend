import { useActions } from '@/hooks/useActions'
import { useCart } from '@/hooks/useCart'
import { IAddToCart } from '@/store/cart/cart.types'
import Button from '@/ui/button/Button'

const AddToCartInline = ({ product, size, price }: IAddToCart) => {
	const { addToCart, removeFromCart } = useActions()
	const { items } = useCart()

	const currentElement = items.find(
		CartItem => CartItem.product.id === product.id
	)

	return (
		<Button
			variant="active"
			onClick={() =>
				currentElement
					? removeFromCart({ id: currentElement.id })
					: addToCart({ product, quantity: 1, price, size })
			}
		>
			{currentElement ? 'Remove from cart' : 'Add to cart'}
		</Button>
	)
}

export default AddToCartInline
