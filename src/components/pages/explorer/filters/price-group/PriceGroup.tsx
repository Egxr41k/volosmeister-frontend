import Range from '@/ui/range/Range'
import { useTranslations } from 'next-intl'
import { useFilters } from '../../useFilters'
import FilterWrapper from '../FilterWrapper'

const PriceGroup = () => {
	const t = useTranslations('explorer.filters.price')

	const { queryParams, updateQueryParams } = useFilters()

	return (
		<FilterWrapper title={t('title')}>
			<Range
				max={2000}
				fromInitialValue={queryParams.minPrice}
				toInitialValue={queryParams.maxPrice}
				onChangeFromValue={value => updateQueryParams('minPrice', value)}
				onChangeToValue={value => updateQueryParams('maxPrice', value)}
			/>
		</FilterWrapper>
	)
}

export default PriceGroup
