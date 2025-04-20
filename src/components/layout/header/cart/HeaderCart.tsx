'use client'

import { useCart } from '@/hooks/useCart'
import { useOutside } from '@/hooks/useOutside'
import SquareButton from '@/ui/button/SquareButton'
import { convertPrice } from '@/utils/convertPrice'
import Link from 'next/link'
import { RiShoppingCartLine } from 'react-icons/ri'
import styles from './Cart.module.scss'
import CartItem from './cart-item/CartItem'

const HeaderCart = () => {
	const { isShow, setIsShow, ref } = useOutside(false)

	const { items, total } = useCart()

	return (
		<div className="relative" ref={ref}>
			<SquareButton
				Icon={RiShoppingCartLine}
				onClick={() => {
					setIsShow(!isShow)
				}}
				number={items.length}
			/>

			{isShow && (
				<div className={styles.cartWrapper}>
					<div className="mb-5 text-lg font-normal">My cart</div>

					<div className={styles.cart}>
						{items.length ? (
							items.map(item => <CartItem item={item} key={item.id} />)
						) : (
							<div className="font-light">Cart is empty!</div>
						)}
					</div>

					<div className={styles.footer}>
						<div>Total:</div>
						<div>{convertPrice(total)}</div>
					</div>
					<div className="text-center">
						{!!items.length && (
							<div className="mb-5 mt-7 text-center">
								<Link
									className="btn btn-white"
									href="/checkout"
									onClick={() => setIsShow(false)}
								>
									Go to checkout
								</Link>
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	)
}

export default HeaderCart
