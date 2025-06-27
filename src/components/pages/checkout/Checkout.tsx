'use client'

import { useActions } from '@/hooks/useActions'
import { useCart } from '@/hooks/useCart'
import { OrderService } from '@/services/order.service'
import { IOrderData } from '@/types/order.interface'
import { TypePaginationProducts } from '@/types/product.interface'
import Button from '@/ui/button/Button'
import { convertPrice } from '@/utils/convertPrice'
import { useMutation } from '@tanstack/react-query'
import { SubmitHandler, useForm } from 'react-hook-form'
import styles from './Checkout.module.scss'
import CheckoutItemList from './CheckoutItemList'
import RecomendedProducts from './RecomendedProducts'

interface IOrderInfo extends Omit<IOrderData, 'items' | 'total'> {}

const Checkout = ({ products }: { products?: TypePaginationProducts }) => {
	const { register, handleSubmit } = useForm<IOrderInfo>()

	const { items, total } = useCart()
	const { reset } = useActions()

	const { mutate } = useMutation(
		['create order and payment'],
		(data: IOrderData) => OrderService.place(data),
		{
			onSuccess() {
				reset()
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
		console.log(orderData)
		mutate(orderData)
	}

	return (
		<section className={styles.checkout}>
			<div>
				<CheckoutItemList items={items} />
				<RecomendedProducts
					products={products}
					excludeProducts={items.map(item => item.product)}
				/>
			</div>
			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
				<h2 className={styles.header}>Details</h2>
				<input
					type="text"
					placeholder="Enter first name"
					{...register('firstname', { required: 'This field is required' })}
				/>
				<input
					type="text"
					placeholder="Enter last name"
					{...register('lastname', { required: 'This field is required' })}
				/>
				<input
					type="tel"
					placeholder="Enter phone"
					{...register('phone', { required: 'This field is required' })}
				/>
				<input
					type="email"
					placeholder="Enter email"
					{...register('email', { required: 'This field is required' })}
				/>
				<input
					type="text"
					placeholder="Enter city"
					{...register('city', { required: 'This field is required' })}
				/>
				<input
					type="text"
					placeholder="Enter Nova Poshta branch number"
					{...register('novaPoshtaBranchNumber', {
						required: 'This field is required'
					})}
				/>
				<div className={styles.footer}>
					<div className={styles.total}>
						<div>Total Cost</div>
						<div>{convertPrice(total)}</div>
					</div>
					<Button type="submit" variant="primary">
						Place order
					</Button>
				</div>
			</form>
		</section>
	)
}

export default Checkout
