import { useLocale } from 'next-intl'

export const usePriceConverter = () => {
	const locale = useLocale()

	return (price: number): string => {
		if (price === undefined) price = 0
		const currency = locale === 'uk' ? 'UAH' : 'USD'

		return price.toLocaleString(locale === 'uk' ? 'uk-UA' : 'en-US', {
			style: 'currency',
			currency
		})
	}
}
