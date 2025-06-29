import { useActions } from '@/hooks/useActions'
import { useCart } from '@/hooks/useCart'
import { IAddToCart } from '@/store/cart/cart.types'
import Button from '@/ui/button/Button'
import { useTranslations } from 'next-intl'

const AddToCartInline = ({ product, size, price }: IAddToCart) => {
	const t = useTranslations('product')
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
			{currentElement ? t('removeFromCart') : t('addToCart')}
		</Button>
	)
}

export default AddToCartInline
