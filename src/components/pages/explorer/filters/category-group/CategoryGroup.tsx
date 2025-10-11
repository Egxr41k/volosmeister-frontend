import { ManufacturerService } from '@/services/manufacturer.service'
import Spinner from '@/ui/Spinner'
import { useQuery } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import FilterWrapper from '../FilterWrapper'
import CategoryTree from './CategoryTree'

const CategoryGroup = () => {
	const t = useTranslations('explorer.filters.category')

	const { data, isFetching } = useQuery({
		queryKey: ['manufacturers'],
		queryFn: () => ManufacturerService.getAllWithCategoryTree()
	})

	return (
		<FilterWrapper title={t('title')}>
			{isFetching ? (
				<Spinner />
			) : data?.length ? (
				data.map(manufacturer =>
					manufacturer.categories.map(category => (
						<CategoryTree category={category} />
					))
				)
			) : (
				<p>Categories not found</p>
			)}
		</FilterWrapper>
	)
}

export default CategoryGroup
