import { useFilters } from '@/app/explorer/useFilters'
import { FC } from 'react'
import { BsSearch } from 'react-icons/bs'

const Search: FC = () => {
	const { queryParams, updateQueryParams } = useFilters()

	return (
		<div
			className="grid w-1/3 overflow-hidden rounded-md border border-solid border-gray-300"
			style={{
				gridTemplateColumns: '1fr 0.1fr'
			}}
		>
			<input
				className="w-full px-4 py-2 outline-none"
				value={queryParams.searchTerm}
				onChange={e => updateQueryParams('searchTerm', e.target.value)}
				placeholder="Search..."
			/>
			<button className="flex items-center justify-center bg-violet-500 p-2.5 text-white">
				<BsSearch color="black" />
			</button>
		</div>
	)
}

export default Search
