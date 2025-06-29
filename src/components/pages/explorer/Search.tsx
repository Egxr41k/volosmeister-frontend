import { useTranslations } from 'next-intl'
import { BsSearch } from 'react-icons/bs'
import { useFilters } from './useFilters'

const Search = () => {
	const t = useTranslations('explorer')

	const { queryParams, updateQueryParams } = useFilters()

	return (
		<div
			className="grid w-1/4 overflow-hidden rounded-md border border-solid border-gray-300"
			style={{
				gridTemplateColumns: '1fr 0.1fr'
			}}
		>
			<input
				className="w-full px-4 py-2 outline-none"
				value={queryParams.searchTerm}
				onChange={e => updateQueryParams('searchTerm', e.target.value)}
				placeholder={t('searchPlaceholder')}
			/>
			<button className="flex items-center justify-center bg-emerald-100 p-2.5 text-emerald-500">
				<BsSearch />
			</button>
		</div>
	)
}

export default Search
