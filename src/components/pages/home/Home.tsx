'use client'

import { ProductService } from '@/services/product.service'
import { TypePaginationProducts } from '@/types/product.interface'
import Carousel from '@/ui/carousel/Carousel'
import Catalog from '@/ui/catalog/Catalog'
import { useQuery } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { carouselItems } from './carousel.data'

interface IHomeProps {
	initialProducts: TypePaginationProducts | undefined
}

const Home = ({ initialProducts }: IHomeProps) => {
	const t = useTranslations('homepage')

	const { data } = useQuery({
		queryKey: ['home page'],
		queryFn: () => ProductService.getAll(),
		initialData: initialProducts
	})

	return (
		<>
			<Carousel items={carouselItems} className="mb-10" />
			<Catalog title={t('title')} products={data?.products ?? []} />
		</>
	)
}

export default Home
