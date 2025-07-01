import { usePriceConverter } from '@/hooks/usePriceConverter'
import CartActions from '@/layout/header/cart/cart-item/cart-actions/CartActions'
import { ICartItem } from '@/types/cart.interface'
import Image from 'next/image'
import styles from './CheckoutItem.module.scss'

const CheckoutItem = ({ cartItem }: { cartItem: ICartItem }) => {
	const convertPrice = usePriceConverter()
	return (
		<div key={cartItem.id} className={styles.checkoutItem}>
			<Image
				src={cartItem.product.images[0]}
				width={200}
				height={200}
				alt={cartItem.product.name}
				unoptimized
			/>
			<div className={styles.content}>
				<div className={styles.information}>
					<h1>
						{cartItem.product.name} ({cartItem.size})
					</h1>
					<p>{cartItem.product.category.name}</p>
				</div>
				<div className={styles.price}>
					<div className="text-lg">{convertPrice(cartItem.price)}</div>
					<CartActions item={cartItem} />
				</div>
			</div>
		</div>
	)
}

export default CheckoutItem
