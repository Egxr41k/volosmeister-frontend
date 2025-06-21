import { IProperty } from '@/types/property.interface'

interface IProductProperty {
	properties: IProperty[]
}

const ProductProperties = ({ properties }: IProductProperty) => {
	return (
		<>
			<h1 className="mt-20 text-3xl font-semibold">Properties:</h1>
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
		</>
	)
}

export default ProductProperties
