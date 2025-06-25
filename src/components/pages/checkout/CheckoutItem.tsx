import { ICartItem } from '@/types/cart.interface'
import { convertPrice } from '@/utils/convertPrice'
import Image from 'next/image'
import styles from './Checkout.module.scss'

const CheckoutItem = ({ cartItem }: { cartItem: ICartItem }) => {
	return (
		<div key={cartItem.id} className={styles.item}>
			<Image
				src={cartItem.product.images[0]}
				width={100}
				height={100}
				alt={cartItem.product.name}
				unoptimized
			/>
			<div className={styles.row}>
				<div className={styles.information}>
					<div>
						{cartItem.product.name} ({cartItem.size})
					</div>
					<div>{cartItem.product.category.name}</div>
				</div>
				<div className={styles.price}>{convertPrice(cartItem.price)}</div>
			</div>
		</div>
	)
}

export default CheckoutItem
