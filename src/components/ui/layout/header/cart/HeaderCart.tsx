import { useRouter } from 'next/router'
import { FC } from 'react'
import { RiShoppingCartLine } from 'react-icons/ri'

import SquareButton from '@/components/ui/button/SquareButton'

import { useCart } from '@/hooks/useCart'
import { useOutside } from '@/hooks/useOutside'

import Button from '@/components/ui/button/Button'
import CartItem from './cart-item/CartItem'

const HeaderCart: FC = () => {
	const { isShow, setIsShow, ref } = useOutside(false)

	const { items, total } = useCart()

	const { push } = useRouter()

	return (
		<div className="relative" ref={ref}>
			<SquareButton
				Icon={RiShoppingCartLine}
				onClick={() => {
					setIsShow(!isShow)
				}}
				number={items.length}
			/>
			<div
				className={[
					'bg-secondary menu absolute -left-[12.5rem] top-[4.2rem] z-20 w-80 rounded-xl px-5 py-3 text-sm text-white',
					isShow ? 'open-menu' : 'close-menu'
				].join(' ')}
			>
				<div className="mb-5 text-lg font-normal">My cart</div>

				{/* <div className={styles.cart}> */}
				<div>
					{items.length ? (
						items.map(item => <CartItem item={item} key={item.id} />)
					) : (
						<div className="font-light">Cart is empty!</div>
					)}
				</div>

				<div>
					{/* <div className={styles.footer}> */}
					<div>Total:</div>
					<div>(total)</div>
				</div>
				<div className="text-center">
					<Button variant="white" size="sm" className="btn-link mb-2 mt-5">
						Place order
					</Button>
				</div>
			</div>
		</div>
	)
}

export default HeaderCart
