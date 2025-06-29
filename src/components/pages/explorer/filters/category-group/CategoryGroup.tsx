import { CategoryService } from '@/services/category.service'
import Spinner from '@/ui/Spinner'
import { useQuery } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import FilterWrapper from '../FilterWrapper'
import CategoryTree from './CategoryTree'

const CategoryGroup = () => {
	const t = useTranslations('explorer.filters.category')

	const { data, isFetching } = useQuery({
		queryKey: ['get all categories'],
		queryFn: () => CategoryService.getAllAsTree()
	})

	return (
		<FilterWrapper title={t('title')}>
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

export default CategoryGroup
