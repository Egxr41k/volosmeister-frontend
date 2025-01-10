import { FC } from 'react'

import Checkbox from '@/ui/checkbox/Checkbox'

import { useCategories } from '@/hooks/queries/useCategory'

import { useFilters } from '../../useFilters'
import FilterWrapper from '../FilterWrapper'

const CategoryGroup: FC = () => {
	const { queryParams, updateQueryParams } = useFilters()
	const { data, isLoading } = useCategories()

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
