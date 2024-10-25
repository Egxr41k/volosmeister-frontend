import { RiShoppingCartFill, RiShoppingCartLine } from 'react-icons/ri'

import { useActions } from '../../hooks/useActions'
import { useCart } from '../../hooks/useCart'
import IProduct from '../../types/IProduct'
import { FilledBtn } from './Buttons'

const AddToCartButton = ({ product }: { product: IProduct }) => {
	const { addToCart, removeFromCart } = useActions()
	const { items } = useCart()

	const currentElement = items.find(
		cartItem => cartItem.product.id === product.id
	)

	return (
		<div>
			<FilledBtn
				onClick={() => {
					currentElement
						? removeFromCart({ id: currentElement.id })
						: addToCart({
								product,
								quantity: 1,
								price: product.newPrice
						  })
				}}
			>
				{currentElement ? <RiShoppingCartLine /> : <RiShoppingCartFill />}
			</FilledBtn>
		</div>
	)
}

export default AddToCartButton
