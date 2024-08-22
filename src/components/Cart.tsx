import useCart from '../hooks/useCart'
import useProducts from '../hooks/useProducts'
import IProduct from '../types/data/IProduct'
import BorderedBtn from './btns/BorderedBtn'
import FilledBtn from './btns/FilledBtn'
//import CartItem from "./CartItem";

const Cart = () => {
	const { cartItems, removeFromCart, increaseCartQuantity } = useCart()
	const products = useProducts()

	const removeAll = () => {
		cartItems.forEach(item => {
			removeFromCart(item.id)
		})
	}

	const showItems = () => {
		return cartItems.map(item => {
			const product = findProductById(item.id)
			return <CartItem product={product} quantity={item.quantity} />
		})
	}

	const calculateTotalPrice = (): number => {
		return cartItems.reduce((total, item) => {
			const product = findProductById(item.id)
			return total + (product?.newPrice || 0) * item.quantity
		}, 0)
	}

	const findProductById = (id: number) => {
		return products.find(i => i.id === id)
	}

	return (
		<div className="w-48 bg-fuchsia-50 text-center">
			{cartItems.length == 0 ? (
				<p className="p-3">Ваш кошик поки що порожній</p>
			) : (
				<div>
					<div className="h-72 overflow-y-auto">{showItems()}</div>
					<p className="text-lg font-semibold">
						Загалом: {calculateTotalPrice()} грн.
					</p>
					<div className="my-2">
						<FilledBtn handleClick={removeAll}>Очистити кошик</FilledBtn>
					</div>
					<div className="my-2">
						<BorderedBtn handleClick={() => {}}>Замовити все</BorderedBtn>
					</div>
				</div>
			)}
		</div>
	)
}

const CartItem = ({
	product,
	quantity
}: {
	product?: IProduct
	quantity: number
}) => {
	const { increaseCartQuantity, decreaseCartQuantity } = useCart()
	return product ? (
		<div className="flex flex-col gap-3 p-3">
			<img src={product.imageSrc} alt="" className="mx-auto h-32 w-32" />
			<p>{product.name}</p>
			<div className="flex items-center justify-around">
				<BorderedBtn handleClick={() => increaseCartQuantity(product.id)}>
					+
				</BorderedBtn>
				<p>{quantity}</p>
				<BorderedBtn handleClick={() => decreaseCartQuantity(product.id)}>
					-
				</BorderedBtn>
			</div>
			<p className="text-start">
				Ціна: {product.newPrice.toLocaleString()} грн.
			</p>
		</div>
	) : (
		<p className="p-3">продукт не знайдено</p>
	)
}

export default Cart
