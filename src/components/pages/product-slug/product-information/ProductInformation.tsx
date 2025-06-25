import { IProduct } from '@/types/product.interface'
import Button from '@/ui/button/Button'
import { convertPrice } from '@/utils/convertPrice'
import Link from 'next/link'
import ProductReviewsCount from '../ProductReviewsCount'
import AddToCartInline from './AddToCartInline'
import { ProductIngredients } from './ProductIngredients'

interface IProductInformation {
	product: IProduct
}

export default function ProductInformation({ product }: IProductInformation) {
	return (
		<div className="flex flex-col gap-4 rounded-lg bg-white p-6">
			<h1 className="text-4xl font-medium">{product.name}</h1>
			<div className="flex gap-1 font-medium">
				<Link
					href={`/manufacturer/${product.manufacturer.slug}`}
					className="duration-300 hover:text-emerald-500 hover:underline"
				>
					{product.manufacturer.name}
				</Link>
				<p>:</p>
				<Link
					href={`/category/${product.category.slug}`}
					className="duration-300 hover:text-emerald-500 hover:underline"
				>
					{product.category.name}
				</Link>
			</div>

			<p className="text-sm">{product.description}</p>

			<ProductIngredients ingredients={product.ingredients} />

			<div className="flex gap-5">
				<p className="text-2xl font-medium">
					{convertPrice(product.prices[0])}
				</p>
				<Button variant="primary">Buy Now</Button>
				<AddToCartInline product={product} />
			</div>

			{/* <FavoriteButton productId={product.id} /> */}
			<ProductReviewsCount reviews={product.reviews} />
		</div>
	)
}
