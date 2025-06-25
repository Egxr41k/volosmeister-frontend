'use client'

import { useActions } from '@/hooks/useActions'
import { useCart } from '@/hooks/useCart'
import { OrderService } from '@/services/order.service'
import { ProductService } from '@/services/product.service'
import { TypePaginationProducts } from '@/types/product.interface'
import Button from '@/ui/button/Button'
import ProductItem from '@/ui/catalog/product-item/ProductItem'
import { convertPrice } from '@/utils/convertPrice'
import { useMutation, useQuery } from '@tanstack/react-query'
import styles from './Checkout.module.scss'
import CheckoutItem from './CheckoutItem'

const Checkout = ({ products }: { products?: TypePaginationProducts }) => {
	const { data } = useQuery({
		queryKey: ['product checkout'],
		queryFn: () => ProductService.getAll(),
		initialData: products
	})

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
				<div className={styles.footer}>
					<div className={styles.total}>
						<div>Total Cost</div>
						<div>{convertPrice(total)}</div>
					</div>
					<Button
						variant="primary"
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
				<div className="grid grid-cols-2 gap-10">
					{data?.products
						.filter(
							product =>
								!items.map(item => item.product.id).includes(product.id)
						)
						.slice(0.2)
						.map(product => <ProductItem product={product} key={product.id} />)}
				</div>
			</div>
		</section>
	)
}

export default Checkout
