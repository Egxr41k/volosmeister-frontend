import { TypePaginationProducts } from '@/types/product.interface'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
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
				<Link
					className="whitespace-nowrap rounded-lg bg-emerald-500 px-10 py-2 text-base font-medium text-white transition duration-300 ease-out"
					href="https://ig.me/m/volosmeister"
				>
					{t('offer.button')}
				</Link>
			</div>

			<NewProducts initialProducts={initialProducts} />
		</main>
	)
}

export default Home
