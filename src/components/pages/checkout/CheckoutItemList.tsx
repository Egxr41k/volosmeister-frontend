import { ICartItem } from '@/types/cart.interface'
import { useTranslations } from 'next-intl'
import styles from './Checkout.module.scss'
import CheckoutItem from './CheckoutItem'

const CheckoutItemList = ({ items }: { items: ICartItem[] }) => {
	const t = useTranslations('checkout')

	if (!items.length) return null

	return (
		<div className="w-full">
			<h1 className={styles.header}>{t('title')}</h1>
			<div className={styles.orderItems}>
				{items.map(item => (
					<CheckoutItem cartItem={item} />
				))}
			</div>
		</div>
	)
}

export default CheckoutItemList
