'use client'
import { useActions } from '@/hooks/useActions'
import { useCart } from '@/hooks/useCart'
import { ICartItem } from '@/types/ICartItem'
import BorderedBtn from './btns/BorderedBtn'

const Cart = () => {
	const { items, total } = useCart()

	return (
		<div className="w-48 text-center text-black">
			<div>
				{items.length ? (
					items.map(item => <CartItem item={item} key={item.id} />)
				) : (
					<div className="">Cart is empty!</div>
				)}
			</div>
			<div>
				<p className="">Загалом: {total} грн.</p>
				<div className="my-2">
					<BorderedBtn handleClick={() => {}}>Замовити все</BorderedBtn>
				</div>
			</div>
		</div>
	)
}

const CartItem = ({ item }: { item: ICartItem }) => {
	const { changeQuantity } = useActions()

	const { items } = useCart()
	const quantity = items.find(cartItem => cartItem.id === item.id)?.quantity

	return item.product ? (
		<div className="flex flex-col gap-3 p-3">
			<img src={item.product.imageSrc} alt="" className="mx-auto h-32 w-32" />
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
				Ціна: {item.product.newPrice.toLocaleString()} грн.
			</p>
		</div>
	) : (
		<p className="p-3">продукт не знайдено</p>
	)
}

export default Cart
