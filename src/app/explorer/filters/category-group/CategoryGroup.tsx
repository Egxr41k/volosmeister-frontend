import { useGetRootCategories } from '@/hooks/queries/useCategories'
import Checkbox from '@/ui/checkbox/Checkbox'
import Spinner from '@/ui/Spinner'
import { useFilters } from '../../useFilters'
import FilterWrapper from '../FilterWrapper'

const CategoryGroup = () => {
	const { queryParams, updateQueryParams } = useFilters()
	const { data = [], isFetching } = useGetRootCategories()

	return (
		<FilterWrapper title="Category">
			{isFetching ? (
				<Spinner />
			) : data?.length ? (
				data.map(category => {
					const isChecked = queryParams.categoryId === category.id.toString()
					return (
						<Checkbox
							isChecked={isChecked}
							onClick={() =>
								updateQueryParams(
									'categoryId',
									isChecked ? '' : category.id.toString()
								)
							}
							key={category.id}
							className="mb-2 text-sm"
						>
							{category.name}
						</Checkbox>
					)
				})
			) : (
				<p>Categories not found</p>
			)}
		</FilterWrapper>
	)
}

export default CategoryGroup
