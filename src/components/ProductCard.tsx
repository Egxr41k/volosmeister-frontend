'use client'
import IProduct from '@/types/data/IProduct'
import ServerImage from './ServerImage'

const ProductCard = ({ product: product }: { product: IProduct }) => {
	return (
		<div className="m-2.5 w-60 rounded-lg border border-solid border-gray-300">
			<div className="h-72">
				<ServerImage imageSrc={product.imageSrc} />
			</div>
			<div className="p-2.5">
				<h2 className="text-xl font-semibold text-black">{product.name}</h2>
				<div className="my-2 flex justify-between">
					<div className="">
						<p className="text-sm text-gray-400 line-through">
							{product.oldPrice} ₴
						</p>
						<p className="text-sm text-violet-500">{product.newPrice} ₴</p>
					</div>
					<div className="flex gap-3">
						<img src="/icons/favorite.svg" alt="" width={24} height={24} />
						<img src="/icons/cart.svg" alt="" width={24} height={24} />
					</div>
				</div>
			</div>
		</div>
	)
}
export default ProductCard
