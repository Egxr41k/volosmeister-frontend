import { useCart } from '@/hooks/useCart'
import { HiShoppingBag } from 'react-icons/hi2'
import BorderedBtn from '../btns/BorderedBtn'
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
							<BorderedBtn handleClick={() => {}}>Замовити все</BorderedBtn>
						</div>
					</div>
				</div>
			</Sidebar>
		</div>
	)
}

export default Cart
