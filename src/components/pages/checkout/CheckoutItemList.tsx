import { ICartItem } from '@/types/cart.interface'
import styles from './Checkout.module.scss'
import CheckoutItem from './CheckoutItem'

const CheckoutItemList = ({ items }: { items: ICartItem[] }) => {
	if (!items.length) return null

	return (
		<div className={styles.list}>
			{items.map(item => (
				<CheckoutItem cartItem={item} />
			))}
		</div>
	)
}

export default CheckoutItemList
