import { ICategoryTree } from '@/types/category.interface'
import Checkbox from '@/ui/checkbox/Checkbox'
import { useFilters } from '../../useFilters'
import { updateCategoriesQuery } from './update-categories-query'

const CategoryTree = ({ category }: { category: ICategoryTree }) => {
	const { queryParams, updateQueryParams } = useFilters()

	const dfs = (node: ICategoryTree): number[] => {
		return [node.id].concat(...node.children.map(child => dfs(child)))
	}

	return (
		<div key={category.id} className="ml-2">
			<Checkbox
				isChecked={
					queryParams.categoriesIds?.includes(category.id.toString()) ?? false
				}
				onClick={() => {
					const categoriesQuery = updateCategoriesQuery(
						queryParams.categoriesIds ?? '',
						dfs(category).map(String)
					)
					updateQueryParams('categoriesIds', categoriesQuery)
				}}
				className="mb-2 text-sm"
			>
				{category.name}
			</Checkbox>
			{category.children.map(category => (
				<div className="ml-4">
					<CategoryTree category={category} />{' '}
				</div>
			))}
		</div>
	)
}

export default CategoryTree
