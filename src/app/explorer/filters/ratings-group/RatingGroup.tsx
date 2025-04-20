import Checkbox from '@/ui/checkbox/Checkbox'
import { Rating } from 'react-simple-star-rating'
import { useFilters } from '../../useFilters'
import FilterWrapper from '../FilterWrapper'
import { RATINGS_VARIANTS } from './ratings-variants.data'
import { updateRatingsQuery } from './update-ratings-query'

const RatingGroup = () => {
	const { queryParams, updateQueryParams } = useFilters()

	return (
		<FilterWrapper title="number of reviews">
			{RATINGS_VARIANTS.map(rating => (
				<Checkbox
					isChecked={queryParams.ratings?.includes(rating.toString()) ?? false}
					onClick={() =>
						updateQueryParams(
							'ratings',
							updateRatingsQuery(queryParams.ratings ?? '', rating.toString())
						)
					}
					key={rating}
					className="mb-2 text-sm"
				>
					<Rating
						readonly
						initialValue={rating}
						SVGstyle={{ display: 'inline-block' }}
						fillColor="#10b981"
						size={20}
						transition
					/>
				</Checkbox>
			))}
		</FilterWrapper>
	)
}

export default RatingGroup
