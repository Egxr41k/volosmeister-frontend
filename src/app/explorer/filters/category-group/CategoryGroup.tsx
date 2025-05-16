import { CategoryService } from '@/services/category.service'
import Checkbox from '@/ui/checkbox/Checkbox'
import { useQuery } from '@tanstack/react-query'
import { useFilters } from '../../useFilters'
import FilterWrapper from '../FilterWrapper'

const CategoryGroup = () => {
	const { queryParams, updateQueryParams } = useFilters()
	const { data = [], isLoading } = useQuery({
		queryKey: ['get categories'],
		queryFn: () => CategoryService.getRoot(),
		select: data => data.data
	})

	return (
		<FilterWrapper title="Category">
			{isLoading ? (
				<></>
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
