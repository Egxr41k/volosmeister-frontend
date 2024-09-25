import { useActions } from '@/hooks/useActions'
import { useCart } from '@/hooks/useCart'
import { ICartItem } from '@/types/cart.interface'
import BorderedBtn from '../btns/BorderedBtn'

const CartItem = ({ item }: { item: ICartItem }) => {
	const { changeQuantity } = useActions()

	const { items } = useCart()
	const quantity = items.find(cartItem => cartItem.id === item.id)?.quantity

	return item.product ? (
		<div className="flex flex-col gap-3 p-3">
			<img src={item.product.images[0]} alt="" className="mx-auto h-32 w-32" />
			<p>{item.product.name}</p>
			<div className="flex items-center justify-around">
				<BorderedBtn
					handleClick={() => changeQuantity({ id: item.id, type: 'plus' })}
				>
					+
				</BorderedBtn>
				<p>{quantity}</p>
				<BorderedBtn
					handleClick={() => changeQuantity({ id: item.id, type: 'minus' })}
				>
					-
				</BorderedBtn>
			</div>
			<p className="text-start">
				Ціна: {item.product.price.toLocaleString()} грн.
			</p>
		</div>
	) : (
		<p className="p-3">продукт не знайдено</p>
	)
}

export default CartItem
