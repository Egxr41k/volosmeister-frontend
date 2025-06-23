import { useActions } from '@/hooks/useActions'
import { useCart } from '@/hooks/useCart'
import { IProduct } from '@/types/product.interface'
import Button from '@/ui/button/Button'

const AddToCartInline = ({ product }: { product: IProduct }) => {
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
					: addToCart({ product, quantity: 1, price: product.prices[0] })
			}
		>
			{currentElement ? 'Remove from cart' : 'Add to cart'}
		</Button>
	)
}

export default AddToCartInline
