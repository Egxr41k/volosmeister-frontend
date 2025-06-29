import { EnumProductSort } from '@/types/product.interface'
import { ISelectItem } from '@/ui/select/select.interface'
import { useTranslations } from 'next-intl'

export const getSortOptions = (): ISelectItem<EnumProductSort>[] => {
	const t = useTranslations('explorer.sort.sortOptions')

	return [
		{
			key: EnumProductSort.HIGH_PRICE,
			label: t('highPrice')
		},
		{
			key: EnumProductSort.LOW_PRICE,
			label: t('lowPrice')
		},
		{
			key: EnumProductSort.NEWEST,
			label: t('newest')
		},
		{
			key: EnumProductSort.OLDEST,
			label: t('oldest')
		}
	]
}
