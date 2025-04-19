'use client'

import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { FC } from 'react'

import Button from '@/ui/button/Button'
import ProductItem from '@/ui/catalog/product-item/ProductItem'

import { useActions } from '@/hooks/useActions'
import { useCart } from '@/hooks/useCart'

import { IProduct } from '@/types/product.interface'

import { convertPrice } from '@/utils/convertPrice'

import styles from './Checkout.module.scss'
import CheckoutItem from './CheckoutItem'
import { OrderService } from '@/services/order.service'

const Checkout: FC<{ products: IProduct[] }> = ({ products = [] }) => {
	const { items, total } = useCart()

	const { reset } = useActions()

	const { push } = useRouter()

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

	return (
		<>
			{items.length ? (
				<section className={styles.checkout}>
					<div>
						<h1 className="mb-6 text-3xl font-semibold">Checkout</h1>
						<div className={styles.list}>
							{items.map(item => (
								<CheckoutItem key={item.id} product={item.product} />
							))}
						</div>
						<div className={styles.footer}>
							<div className={styles.total}>
								<div>Total Cost</div>
								<div>{convertPrice(total)}</div>
							</div>
							<Button
								variant="white"
								size="lg"
								className="mb-2 mt-5"
								onClick={() => mutate()}
							>
								Place order
							</Button>
						</div>
					</div>
					<div>
						<h1 className="mb-6 text-2xl font-semibold">Recomended products</h1>
						<div className={styles.recomended}>
							{products
								.filter(
									product =>
										!items.map(item => item.product.id).includes(product.id)
								)
								.slice(0.2)
								.map(product => (
									<ProductItem product={product} key={product.id} />
								))}
						</div>
					</div>
				</section>
			) : (
				<div>Fill your cart first!</div>
			)}
		</>
	)
}

export default Checkout
