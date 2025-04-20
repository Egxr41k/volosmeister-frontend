import { IProduct } from '@/types/product.interface'
import FavoriteButton from '@/ui/catalog/product-item/FavoriteButton'
import { convertPrice } from '@/utils/convertPrice'
import Link from 'next/link'
import { FaLock } from 'react-icons/fa'
import AddToCartInline from './AddToCartInline'

interface IProductInformation {
	product: IProduct
}

export default function ProductInformation({ product }: IProductInformation) {
	return (
		<div className="shadow-md-md relative h-max rounded-lg bg-white p-6">
			<div className="text-3xl font-semibold">
				{convertPrice(product.price)}
			</div>
			<div className="mt-2">
				$6.88 Shiping{' '}
				<Link href="/" className="text-aqua ml-2 font-semibold">
					Details
				</Link>
			</div>
			<span className="mt-1 block text-sm opacity-50">
				Sales taxes may apple in checkout
			</span>
			<div className="mt-4 text-sm">
				<span className="mr-1 opacity-50">Delivery</span> Thursday, June 10
			</div>
			<AddToCartInline product={product} />
			<p className="items center mt-2 flex text-sm opacity-40">
				<FaLock className="mr-2" /> Secure transition
			</p>
			<FavoriteButton productId={product.id} />
		</div>
	)
}
