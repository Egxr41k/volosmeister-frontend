import { EnumProductSort } from '@/types/product.interface'
import Select from '@/ui/select/Select'
import { Dispatch, SetStateAction } from 'react'
import { useFilters } from '../useFilters'
import { SORT_SELECT_DATA } from './sort.select.data'

interface ISortType {
	sortType: EnumProductSort
	setSortType: Dispatch<SetStateAction<EnumProductSort>>
}

// const SortDropdown: FC<ISortType> = ({ sortType, setSortType }) => {
const SortDropdown = () => {
	const { queryParams, updateQueryParams } = useFilters()

	return (
		<div className="z-10 text-right">
			<Select<EnumProductSort>
				data={SORT_SELECT_DATA}
				onChange={value => updateQueryParams('sort', value.key.toString())}
				value={SORT_SELECT_DATA.find(value => value.key === queryParams.sort)}
				title="Sort by"
			/>
		</div>
	)
}

export default SortDropdown
