import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import { IProduct } from '@/types/product.interface'

import { convertPrice } from '@/utils/convertPrice'

import AddToCartButton from './AddToCartButton'
import FavoriteButton from './FavoriteButton'
import ProductRating from './ProductRating'

const ProductItem: FC<{ product: IProduct }> = ({ product }) => {
	return (
		<div className="animate-scaleIn rounded-lg border border-solid border-gray-300">
			<div className="relative overflow-hidden rounded-lg bg-white">
				<Link href={`product/${product.slug}`}>
					<Image
						className="h-[306px] w-[306px]"
						width={306}
						height={306}
						src={product.images[0]}
						alt={product.name}
					/>
				</Link>
			</div>
			<div className="p-2">
				<Link href={`product/${product.slug}`}>
					<h3 className="mt-2 font-semibold">{product.name}</h3>
				</Link>
				<Link
					href={`category/${product.category.slug}`}
					className="text-aqua mb-2 text-xs"
				>
					{product.category.name}
				</Link>
				<ProductRating product={product} isText />
				<div className="mt-2 flex items-center justify-between">
					<div className="text-xl font-semibold">
						{convertPrice(product.price)}
					</div>
					<div className="flex gap-2">
						<FavoriteButton productId={product.id} />
						<AddToCartButton product={product} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default ProductItem
