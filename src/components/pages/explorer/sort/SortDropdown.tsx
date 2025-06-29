import { EnumProductSort } from '@/types/product.interface'
import Select from '@/ui/select/Select'
import { useTranslations } from 'next-intl'
import { Dispatch, SetStateAction } from 'react'
import { useFilters } from '../useFilters'
import { getSortOptions } from './sort.select.data'

interface ISortType {
	sortType: EnumProductSort
	setSortType: Dispatch<SetStateAction<EnumProductSort>>
}

// const SortDropdown: FC<ISortType> = ({ sortType, setSortType }) => {
const SortDropdown = () => {
	const { queryParams, updateQueryParams } = useFilters()

	const t = useTranslations('explorer.sort')

	const sortOptions = getSortOptions()
	return (
		<div className="z-10 text-right">
			<Select<EnumProductSort>
				data={sortOptions}
				onChange={value => updateQueryParams('sort', value.key.toString())}
				value={sortOptions.find(value => value.key === queryParams.sort)}
				title={t('sortBy')}
			/>
		</div>
	)
}

export default SortDropdown
