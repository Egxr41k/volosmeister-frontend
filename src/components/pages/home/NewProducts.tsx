'use client'

import { ProductService } from '@/services/product.service'
import { TypePaginationProducts } from '@/types/product.interface'
import ProductItem from '@/ui/catalog/product-item/ProductItem'
import { useQuery } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import styles from './Home.module.scss'

const NewProducts = ({
	initialProducts
}: {
	initialProducts: TypePaginationProducts | undefined
}) => {
	const t = useTranslations('home')

	const { data } = useQuery({
		queryKey: ['recomended products'],
		queryFn: () => ProductService.getAll(),
		initialData: initialProducts,
		enabled: !initialProducts
	})

	return (
		<div className={styles.newProducts}>
			<h1>{t('title')}</h1>
			<div className={styles.list}>
				{data?.products.map(product => (
					<ProductItem product={product} key={product.id} />
				))}
			</div>
		</div>
	)
}

export default NewProducts
