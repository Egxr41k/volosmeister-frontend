import { IProperty } from '@/types/property.interface'

interface IProductProperty {
	properties: IProperty[]
}

const ProductProperties = ({ properties }: IProductProperty) => {
	if (!properties.length) return null

	return (
		<>
			<h1 className="mt-20 text-3xl font-semibold">Properties:</h1>
			{properties.map((property: IProperty) => {
				return property.name == '' ? (
					<p>{property.value}</p>
				) : (
					<p>{property.name + ': ' + property.value}</p>
				)
			})}
		</>
	)
}

export default ProductProperties
