import { IProduct } from '@/types/product.interface'
import Image from 'next/image'
import Link from 'next/link'
import AddToCartButton from './AddToCartButton'
import FavoriteButton from './FavoriteButton'
import ProductRating from './ProductRating'

const ProductItem = ({ product }: { product: IProduct }) => {
	return (
		<div className="animate-scaleIn rounded-lg border border-solid border-gray-300">
			<Link
				href={`product/${product.slug}`}
				className="flex rounded-lg bg-white"
			>
				<Image
					className="mx-auto h-52 w-52 object-contain"
					width={100}
					height={100}
					src={product.images[0]}
					alt={product.name}
					unoptimized
				/>
			</Link>
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
					<p className="">{product.prices[0]} грн</p>
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
