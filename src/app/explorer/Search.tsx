import { useFilters } from '@/app/explorer/useFilters'
import { FC } from 'react'
import { BsSearch } from 'react-icons/bs'

const Search: FC = () => {
	const { queryParams, updateQueryParams } = useFilters()

	return (
		<div className="flex w-64 overflow-hidden rounded-md border border-solid border-gray-300">
			<div className="flex items-center justify-center p-2.5">
				<BsSearch />
			</div>
			<input
				className="w-full px-4 py-2 outline-none"
				value={queryParams.searchTerm}
				onChange={e => updateQueryParams('searchTerm', e.target.value)}
				placeholder="Search..."
			/>
		</div>
	)
}

export default Search
