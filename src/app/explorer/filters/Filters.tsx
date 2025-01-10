import { FC } from 'react'

import CategoryGroup from './category-group/CategoryGroup'
import PriceGroup from './price-group/PriceGroup'
import RatingGroup from './ratings-group/RatingGroup'

const Filters: FC = () => {
	return (
		<div className="rounded-lg border border-solid border-gray-300 p-2">
			<PriceGroup />
			<CategoryGroup />
			<RatingGroup />
		</div>
	)
}

export default Filters
