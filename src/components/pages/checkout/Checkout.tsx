'use client'

import { useActions } from '@/hooks/useActions'
import { useCart } from '@/hooks/useCart'
import { OrderService } from '@/services/order.service'
import { TypePaginationProducts } from '@/types/product.interface'
import Button from '@/ui/button/Button'
import { convertPrice } from '@/utils/convertPrice'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import styles from './Checkout.module.scss'
import CheckoutItem from './CheckoutItem'
import RecomendedProducts from './RecomendedProducts'

// - Структура заказа(гость)

//     Имя

//     Фамилия

//     Номер телефона

//     Город

//     - Тип доставки:

//         Новая почта

//         Укр почта

//     Номер отделения

//     Список продуктов

//     Список Количество продукта

//     - Статус заказа:

//         Не подтвержен

//         Подтвержен

//         Отправлен

//         Получен

interface ICheckoutForm {
	firstname: string
	lastname: string
	phone: string
	email: string
	city: string
	novaPoshtaBranchNumber: string
}

const Checkout = ({ products }: { products?: TypePaginationProducts }) => {
	const { register, handleSubmit } = useForm<ICheckoutForm>()

	const { items, total } = useCart()
	const { reset } = useActions()

	const { mutate } = useMutation(
		['create order and payment'],
		() =>
			OrderService.place({
				items: items.map(item => ({
					price: item.price,
					quantity: item.quantity,
					productId: item.product.id
				}))
			}),
		{
			onSuccess() {
				reset()
				//push(data.confirmation.confirmation_url);
			}
		}
	)

	const onSubmit = (data: any) => {
		console.log(data)
	}

	if (!items.length) return <div>Fill your cart first!</div>

	return (
		<section className={styles.checkout}>
			<div>
				<h1 className="mb-6 text-3xl font-semibold">Checkout</h1>
				<div className={styles.list}>
					{items.map(item => (
						<CheckoutItem cartItem={item} />
					))}
				</div>

				<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
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
					<button type="submit">Submit</button>
				</form>

				<div className={styles.footer}>
					<div className={styles.total}>
						<div>Total Cost</div>
						<div>{convertPrice(total)}</div>
					</div>
					<Button variant="primary" onClick={() => mutate()}>
						Place order
					</Button>
				</div>
			</div>
			<RecomendedProducts
				products={products}
				excludeProducts={items.map(item => item.product)}
			/>
		</section>
	)
}

export default Checkout
