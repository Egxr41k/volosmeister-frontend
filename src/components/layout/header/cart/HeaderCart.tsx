'use client'

import { useCart } from '@/hooks/useCart'
import { useOutside } from '@/hooks/useOutside'
import { convertPrice } from '@/utils/convertPrice'
import Link from 'next/link'
import { RiShoppingCartFill, RiShoppingCartLine } from 'react-icons/ri'
import styles from './Cart.module.scss'
import CartItem from './cart-item/CartItem'

const HeaderCart = () => {
	const { isShow, setIsShow, ref } = useOutside(false)

	const { items, total } = useCart()

	return (
		<div className="relative" ref={ref}>
			<button
				onClick={() => {
					setIsShow(!isShow)
				}}
				className="relative flex h-10 w-10 items-center justify-center rounded text-black transition-colors hover:text-emerald-500"
			>
				{!!items.length ? (
					<RiShoppingCartFill size={21} />
				) : (
					<RiShoppingCartLine size={21} />
				)}
			</button>

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
									className="duration-300 hover:text-emerald-500 hover:underline"
									href="/profile/checkout"
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
