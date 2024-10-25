import { HiShoppingBag } from 'react-icons/hi'
import { useCart } from '../../../hooks/useCart'
import { BorderedBtn } from '../Buttons'
import Sidebar from '../Sidebar'
import CartItem from './CartItem'

const Cart = () => {
	const { items, total } = useCart()

	return (
		<div className="flex">
			<Sidebar position="right" Icon={HiShoppingBag}>
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
							<BorderedBtn onClick={() => {}}>Замовити все</BorderedBtn>
						</div>
					</div>
				</div>
			</Sidebar>
		</div>
	)
}

export default Cart
