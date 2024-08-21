import IFeature from './IFeature'
import IProperty from './IProperty'

interface IProductDetails {
	id: number
	features: IFeature[]
	stats: IProperty[]
}

export const emptyDetails: IProductDetails = {
	id: 0,
	features: [],
	stats: []
}

export default IProductDetails
