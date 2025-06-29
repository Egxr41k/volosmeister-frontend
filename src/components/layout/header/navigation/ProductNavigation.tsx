import {
	convertCategorysToMenuItems,
	convertManufacturersToMenuItems
} from '@/layout/sidebar/conver-to-menu-items'
import { CategoryService } from '@/services/category.service'
import { ManufacturerService } from '@/services/manufacturer.service'
import Spinner from '@/ui/Spinner'
import { useQuery } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import {
	HiOutlineBuildingStorefront,
	HiOutlineCube,
	HiOutlineSquares2X2
} from 'react-icons/hi2'
import NavLink from './NavLink'

const ProductNavigation = () => {
	const t = useTranslations('navigation')

	const { data: categories, isFetching: isFetchingCategories } = useQuery({
		queryKey: ['get root categories'],
		queryFn: () => CategoryService.getRoot()
	})

	const { data: manufacturers, isFetching: isFetchingManufacturers } = useQuery(
		{
			queryKey: ['manufacturers'],
			queryFn: () => ManufacturerService.getAll()
		}
	)

	return (
		<>
			<li className="my-2 flex items-center gap-2">
				<NavLink href="/explorer">
					<HiOutlineSquares2X2 size={21} />
					<p>{t('catalog')}</p>
				</NavLink>
			</li>
			{isFetchingCategories && isFetchingManufacturers ? (
				<Spinner />
			) : (
				categories &&
				manufacturers && (
					<>
						<li className="my-2 flex items-center gap-2">
							<NavLink href={'/manufacturer'}>
								<HiOutlineBuildingStorefront size={21} />
								<p>{t('manufacturers')}</p>
							</NavLink>
						</li>
						<ul>
							{convertManufacturersToMenuItems(manufacturers).map(item => (
								<li className="my-2 ml-10 text-sm" key={item.href}>
									<NavLink href={item.href}>{item.label}</NavLink>
								</li>
							))}
						</ul>
						<li className="my-2 flex items-center gap-2">
							<NavLink href="/category">
								<HiOutlineCube size={21} />
								<p>{t('categoires')}</p>
							</NavLink>
						</li>
						<ul>
							{convertCategorysToMenuItems(categories).map(item => (
								<li className="my-2 ml-10 text-sm" key={item.href}>
									<NavLink href={item.href}>{item.label}</NavLink>
								</li>
							))}
						</ul>
					</>
				)
			)}
		</>
	)
}

export default ProductNavigation
