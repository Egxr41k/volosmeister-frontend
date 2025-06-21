import { CategoryService } from '@/services/category.service'
import { ICategoryTree } from '@/types/category.interface'
import Checkbox from '@/ui/checkbox/Checkbox'
import { useCategoryCache } from '@/ui/product-form/useCategoryCache'
import Spinner from '@/ui/Spinner'
import { useQuery } from '@tanstack/react-query'
import { useFilters } from '../../useFilters'
import FilterWrapper from '../FilterWrapper'
import { updateCategoriesQuery } from './update-categories-query'

const CategoryGroup = () => {
	const { data, isFetching } = useQuery({
		queryKey: ['get all categories'],
		queryFn: () => CategoryService.getAll()
	})

	return (
		<FilterWrapper title="Category">
			{isFetching ? (
				<Spinner />
			) : data?.length ? (
				data.map(category => <CategoryTree category={category} />)
			) : (
				<p>Categories not found</p>
			)}
		</FilterWrapper>
	)
}

const CategoryTree = ({ category }: { category: ICategoryTree }) => {
	const { queryParams, updateQueryParams } = useFilters()
	const { getAllCategoryIds } = useCategoryCache([category])

	return (
		<div key={category.id} className="ml-2">
			<Checkbox
				isChecked={
					queryParams.categoriesIds?.includes(category.id.toString()) ?? false
				}
				onClick={() => {
					const categoriesQuery = updateCategoriesQuery(
						queryParams.categoriesIds ?? '',
						getAllCategoryIds().map(String)
					)
					updateQueryParams('categoriesIds', categoriesQuery)
				}}
				className="mb-2 text-sm"
			>
				{category.name}/{category.id}{' '}
			</Checkbox>
			{category.children.map(category => (
				<div className="ml-4">
					<CategoryTree category={category} />{' '}
				</div>
			))}{' '}
		</div>
	)
}

export default CategoryGroup
