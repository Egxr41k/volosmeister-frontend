import { usePriceConverter } from '@/hooks/usePriceConverter'
import { IProduct } from '@/types/product.interface'
import Image from 'next/image'
import Link from 'next/link'
import AddToCartButton from './AddToCartButton'
import FavoriteButton from './FavoriteButton'
import ProductRating from './ProductRating'

const ProductItem = ({ product }: { product: IProduct }) => {
	const convertPrice = usePriceConverter()
	return (
		<div className="animate-scaleIn w-60 rounded-lg bg-white">
			<Link
				href={`product/${product.slug}`}
				className="flex overflow-hidden rounded-lg"
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
				<Link href={`/product/${product.slug}`}>
					<h3 className="mt-2 font-semibold">
						{product.name} ({product.sizes[0]})
					</h3>
				</Link>
				<Link
					href={`/category/${product.category.slug}`}
					className="mb-2 text-xs transition-colors duration-300 hover:text-emerald-500"
				>
					{product.category.name}
				</Link>
				<ProductRating reviews={product.reviews} />
				<div className="mt-2 flex items-center justify-between">
					<p className="">{convertPrice(product.prices[0])}</p>
					<div className="flex gap-2">
						<FavoriteButton productId={product.id} />
						<AddToCartButton
							product={product}
							price={product.prices[0]}
							size={product.sizes[0]}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ProductItem
