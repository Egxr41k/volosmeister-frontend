import { useOutside } from '@/hooks/useOutside'
import Button from '@/ui/button/Button'
import { useTranslations } from 'next-intl'
import { FaAnglesDown, FaAnglesUp } from 'react-icons/fa6'
import CategoryGroup from './category-group/CategoryGroup'
import styles from './Filters.module.scss'
import PriceGroup from './price-group/PriceGroup'
import RatingGroup from './ratings-group/RatingGroup'

const FiltersButton = () => {
	const { isShow, setIsShow, ref } = useOutside(false)
	const t = useTranslations('explorer')

	return (
		<div className="relative" ref={ref}>
			<Button
				variant="active"
				onClick={() => {
					setIsShow(!isShow)
				}}
				className="flex items-center gap-2"
			>
				{isShow ? (
					<>
						<FaAnglesUp /> {t('closeFilters')}
					</>
				) : (
					<>
						<FaAnglesDown /> {t('openFilters')}
					</>
				)}
			</Button>

			<div className={[styles.filters, isShow ? styles.opened : ''].join(' ')}>
				<PriceGroup />
				<CategoryGroup />
				<RatingGroup />
			</div>
		</div>
	)
}

export default FiltersButton
