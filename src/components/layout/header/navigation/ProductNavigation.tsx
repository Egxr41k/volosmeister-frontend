import {
	convertCategorysToMenuItems,
	convertManufacturersToMenuItems
} from '@/layout/sidebar/conver-to-menu-items'
import { ManufacturerService } from '@/services/manufacturer.service'
import Spinner from '@/ui/Spinner'
import { useQuery } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import {
	HiChevronDown,
	HiChevronUp,
	HiOutlineSquares2X2
} from 'react-icons/hi2'
import NavLink from './NavLink'

const ProductNavigation = () => {
	const t = useTranslations('navigation')

	const [isShowCategories, setShowCategories] = useState([] as boolean[])

	const { data: manufacturers, isFetching: isFetchingManufacturers } = useQuery(
		{
			queryKey: ['manufacturers with root'],
			queryFn: () => ManufacturerService.getAllWithRootCategories()
		}
	)

	useEffect(() => {
		if (!manufacturers) return
		setShowCategories(new Array(manufacturers.length).fill(true))
	}, [manufacturers])

	const toggleShowCatogory = (index: number) => {
		setShowCategories(prev => {
			const newIsShow = [...prev]
			newIsShow[index] = !prev[index]
			return newIsShow
		})
	}

	return (
		<>
			<li className="my-2 flex items-center gap-2">
				<NavLink href="/explorer">
					<HiOutlineSquares2X2 size={21} />
					<p>{t('catalog')}</p>
				</NavLink>
			</li>
			{isFetchingManufacturers ? (
				<Spinner />
			) : (
				manufacturers && (
					<>
						<ul>
							{convertManufacturersToMenuItems(manufacturers).map(
								(item, index) => (
									<>
										<li
											className="my-2 flex items-center gap-2"
											key={item.href}
										>
											<button onClick={() => toggleShowCatogory(index)}>
												{isShowCategories[index] ? (
													<HiChevronDown />
												) : (
													<HiChevronUp />
												)}
											</button>
											<NavLink href={item.href}>{item.label}</NavLink>
										</li>
										{isShowCategories[index] &&
											convertCategorysToMenuItems(item.categories).map(item => (
												<li className="my-2 ml-10 text-sm" key={item.href}>
													<NavLink href={item.href}>{item.label}</NavLink>
												</li>
											))}
									</>
								)
							)}
						</ul>
					</>
				)
			)}
		</>
	)
}

export default ProductNavigation
