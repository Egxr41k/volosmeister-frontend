import { usePriceConverter } from '@/hooks/usePriceConverter'
import { IProduct } from '@/types/product.interface'
import Button from '@/ui/button/Button'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useState } from 'react'
import Select from '../../product-form/Select'
import styles from '../Product.module.scss'
import ProductReviewsCount from '../ProductReviewsCount'
import AddToCartInline from './AddToCartInline'
import { ProductIngredients } from './ProductIngredients'

interface IProductInformation {
	product: IProduct
}

interface IPriceSize {
	[key: string]: number
}

export default function ProductInformation({ product }: IProductInformation) {
	const t = useTranslations('product.productInformation')
	const convertPrice = usePriceConverter()

	const { prices, sizes } = product
	const priceSize: IPriceSize = sizes.reduce((acc, size, index) => {
		acc[size] = prices[index]
		return acc
	}, {} as IPriceSize)

	const [selectedPriceSize, setSelectedPriceSize] = useState<[string, number]>([
		sizes[0],
		priceSize[sizes[0]]
	])

	const handleChangeSize = (selectedSize: string) => {
		setSelectedPriceSize([selectedSize, priceSize[selectedSize]])
	}

	return (
		<div className={styles.productInformation}>
			<h1 className={styles.header}>{product.name}</h1>
			<div className={styles.meta}>
				<Link href={`/manufacturer/${product.manufacturer.slug}`}>
					{product.manufacturer.name}
				</Link>
				<p>:</p>
				<Link href={`/category/${product.category.slug}`}>
					{product.category.name}
				</Link>
			</div>

			<p className={styles.description}>{product.description}</p>

			<ProductIngredients ingredients={product.ingredients} />

			<Select
				placeholder={t('sizePlaceholder')}
				options={sizes.map(size => ({
					label: size,
					value: size
				}))}
				value={selectedPriceSize?.[0]}
				onChange={handleChangeSize}
			/>

			<div className={styles.priceRow}>
				<p className={styles.price}>{convertPrice(selectedPriceSize[1])}</p>
				<Button variant="primary">{t('buyNow')}</Button>
				<AddToCartInline
					product={product}
					size={selectedPriceSize[0]}
					price={selectedPriceSize[1]}
				/>
			</div>

			<ProductReviewsCount reviews={product.reviews} />
		</div>
	)
}
