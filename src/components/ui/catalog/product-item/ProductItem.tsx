import { IProduct } from '@/types/product.interface'
import ServerImage from '@/ui/ServerImage'
import Link from 'next/link'
import AddToCartButton from './AddToCartButton'
import FavoriteButton from './FavoriteButton'
import ProductRating from './ProductRating'

const ProductItem = ({ product }: { product: IProduct }) => {
	return (
		<div className="animate-scaleIn rounded-lg border border-solid border-gray-300">
			<div className="relative overflow-hidden rounded-lg bg-white">
				<Link href={`product/${product.slug}`}>
					<ServerImage
						className="mx-auto block"
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
					<div className="">{product.price}</div>
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
