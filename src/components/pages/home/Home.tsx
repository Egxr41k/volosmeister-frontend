import { TypePaginationProducts } from '@/types/product.interface'
import Button from '@/ui/button/Button'
import { useTranslations } from 'next-intl'
import styles from './Home.module.scss'
import NewProducts from './NewProducts'

interface IHomeProps {
	initialProducts: TypePaginationProducts | undefined
}

const Home = ({ initialProducts }: IHomeProps) => {
	const t = useTranslations('home')

	return (
		<main className={styles.home}>
			<div className={styles.offer}>
				<h1>{t('offer.title')}</h1>
				<p>{t('offer.description')}</p>
				<Button variant="primary">{t('offer.button')}</Button>
			</div>

			<NewProducts initialProducts={initialProducts} />
		</main>
	)
}

export default Home
