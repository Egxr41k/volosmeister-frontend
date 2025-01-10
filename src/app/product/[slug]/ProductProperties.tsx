import { IProperty } from '@/types/property.interface'
import Heading from '@/ui/Heading'

interface IProductProperty {
	properties: IProperty[]
}

const ProductProperties = ({ properties }: IProductProperty) => (
	<div className="mt-20">
		<Heading className="mt-20">Properties:</Heading>
		<div className="mx-auto">
			{properties.length ? (
				properties.map((property: IProperty) => {
					return property.name == '' ? (
						<p>{property.value}</p>
					) : (
						<p>{property.name + ': ' + property.value}</p>
					)
				})
			) : (
				<div>There are no Properties</div>
			)}
		</div>
	</div>
)

export default ProductProperties
