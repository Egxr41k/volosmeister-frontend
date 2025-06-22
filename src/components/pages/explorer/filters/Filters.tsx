import CategoryGroup from './category-group/CategoryGroup'
import PriceGroup from './price-group/PriceGroup'
import RatingGroup from './ratings-group/RatingGroup'

const Filters = () => {
	return (
		<div className="rounded-lg bg-white p-2">
			<PriceGroup />
			<CategoryGroup />
			<RatingGroup />
		</div>
	)
}

export default Filters
