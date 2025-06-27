import CartActions from '@/layout/header/cart/cart-item/cart-actions/CartActions'
import { ICartItem } from '@/types/cart.interface'
import { convertPrice } from '@/utils/convertPrice'
import Image from 'next/image'
import styles from './CheckoutItem.module.scss'

const CheckoutItem = ({ cartItem }: { cartItem: ICartItem }) => {
	return (
		<div key={cartItem.id} className={styles.checkoutItem}>
			<Image
				src={cartItem.product.images[0]}
				width={100}
				height={100}
				alt={cartItem.product.name}
				unoptimized
			/>
			<div className={styles.row}>
				<div className={styles.information}>
					<h1>
						{cartItem.product.name} ({cartItem.size})
					</h1>
					<p>{cartItem.product.category.name}</p>
				</div>
				<CartActions item={cartItem} />
			</div>
			<div className={styles.price}>{convertPrice(cartItem.price)}</div>
		</div>
	)
}

export default CheckoutItem
