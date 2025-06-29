import { ICarouselItem } from '@/ui/carousel/carousel.interface'
import { useTranslations } from 'next-intl'

export const getCarouselItems = (): ICarouselItem[] => {
	const t = useTranslations('carousel.carouselItems')

	return [
		{
			title: t('freeDelivery.title'),
			description: t('freeDelivery.description')
		},
		{
			title: t('newProducts.title'),
			description: t('newProducts.description')
		}
	]
}
