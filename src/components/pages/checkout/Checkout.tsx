'use client'

import { useActions } from '@/hooks/useActions'
import { useCart } from '@/hooks/useCart'
import { usePriceConverter } from '@/hooks/usePriceConverter'
import { OrderService } from '@/services/order.service'
import { IOrderData } from '@/types/order.interface'
import { TypePaginationProducts } from '@/types/product.interface'
import Button from '@/ui/button/Button'
import { useMutation } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { SubmitHandler, useForm } from 'react-hook-form'
import styles from './Checkout.module.scss'
import CheckoutItemList from './CheckoutItemList'

interface IOrderInfo extends Omit<IOrderData, 'items' | 'total'> {}

const Checkout = ({ products }: { products?: TypePaginationProducts }) => {
	const t = useTranslations('checkout')
	const convertPrice = usePriceConverter()

	const { register, handleSubmit } = useForm<IOrderInfo>()
	const { items, total } = useCart()
	const { reset } = useActions()

	const { mutate } = useMutation(
		['create order and payment'],
		(data: IOrderData) => OrderService.place(data),
		{
			onSuccess() {
				reset()
				alert(t('success'))
			}
		}
	)

	const onSubmit: SubmitHandler<IOrderInfo> = (data: IOrderInfo) => {
		const orderData: IOrderData = {
			items: items.map(item => ({
				price: item.price,
				quantity: item.quantity,
				productId: item.product.id
			})),
			total,
			...data
		}
		mutate(orderData)
	}

	return (
		<main className={styles.checkout}>
			<CheckoutItemList items={items} />
			{/* <div className="flex flex-col">
				<h1 className={styles.header}>{t('title')}</h1>
				<CheckoutItemList items={items} />
				<h2 className={styles.header}>{t('recomended')}</h2>
				<AlsoBuy
					products={products}
					excludeProducts={items.map(item => item.product)}
				/>
			</div> */}
			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
				<h2 className={styles.header}>{t('details')}</h2>
				<input
					type="text"
					placeholder={t('firstnamePlaceholder')}
					{...register('firstname', { required: true })}
				/>
				<input
					type="text"
					placeholder={t('lastnamePlaceholder')}
					{...register('lastname', { required: true })}
				/>
				<input
					type="tel"
					placeholder={t('phonePlaceholder')}
					{...register('phone', { required: true })}
				/>
				<input
					type="email"
					placeholder={t('emailPlaceholder')}
					{...register('email', { required: true })}
				/>
				<input
					type="text"
					placeholder={t('cityPlaceholder')}
					{...register('city', { required: true })}
				/>
				<input
					type="text"
					placeholder={t('novaPoshtaBranchNumberPlaceholder')}
					{...register('novaPoshtaBranchNumber', { required: true })}
				/>
				<div className={styles.footer}>
					<div className={styles.total}>
						<div>{t('total')}</div>
						<div>{convertPrice(total)}</div>
					</div>
					<Button type="submit" variant="primary" size="sm">
						{t('placeOrder')}
					</Button>
				</div>
			</form>
		</main>
	)
}

export default Checkout
