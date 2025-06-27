import { ICartItem } from '@/types/cart.interface'
import styles from './Checkout.module.scss'
import CheckoutItem from './CheckoutItem'

const CheckoutItemList = ({ items }: { items: ICartItem[] }) => {
	if (!items.length) return <div>Fill your cart first!</div>

	return (
		<>
			<h1 className={styles.header}>Checkout</h1>
			<div className={styles.list}>
				{items.map(item => (
					<CheckoutItem cartItem={item} />
				))}
			</div>
		</>
	)
}

export default CheckoutItemList
