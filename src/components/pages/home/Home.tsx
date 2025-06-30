'use client'

import { ProductService } from '@/services/product.service'
import { TypePaginationProducts } from '@/types/product.interface'
import Button from '@/ui/button/Button'
import ProductItem from '@/ui/catalog/product-item/ProductItem'
import { useQuery } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import styles from './Home.module.scss'

interface IHomeProps {
	initialProducts: TypePaginationProducts | undefined
}

const Home = ({ initialProducts }: IHomeProps) => {
	const t = useTranslations('home')

	const { data } = useQuery({
		queryKey: ['recomended products'],
		queryFn: () => ProductService.getAll(),
		initialData: initialProducts,
		enabled: !initialProducts
	})

	return (
		<main className={styles.home}>
			<div className={styles.offer}>
				<h1>{t('offer.title')}</h1>
				<p>{t('offer.description')}</p>
				<Button variant="primary">{t('offer.button')}</Button>
			</div>

			<div className={styles.newProducts}>
				<h1>{t('title')}</h1>
				<div className={styles.list}>
					{data?.products.map(product => (
						<ProductItem product={product} key={product.id} />
					))}
				</div>
			</div>
		</main>
	)
}

export default Home
