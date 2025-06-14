import { IProperty } from '@/types/property.interface'
import BorderedBtn from '@/ui/button/BorderedBtn'

interface IPropertyFields {
	properties: IProperty[]
	setProperties: (value: IProperty[]) => void
}

const PropertyFields = ({ properties, setProperties }: IPropertyFields) => {
	const appendProperty = () => {
		setProperties([
			...properties,
			{
				name: '',
				value: ''
			} as IProperty
		])
	}

	const removeProperty = () => {
		setProperties(properties.filter((_, i) => i !== properties.length - 1))
	}

	const setPropertyName = (value: string, i: number) => {
		const newProperties = [...properties]
		newProperties[i].name = value
		setProperties(newProperties)
	}

	const setPropertyValue = (value: string, i: number) => {
		const newProperties = [...properties]
		newProperties[i].value = value

		setProperties(newProperties)
	}

	return (
		<div className="my-2">
			<div className="flex justify-between">
				<h2 className="my-auto text-lg font-semibold">
					{properties.length != 0 ? 'Update properties' : 'Add properties'}
				</h2>
				<BorderedBtn handleClick={appendProperty}>+</BorderedBtn>
			</div>
			{properties.map((property: IProperty, i: number) => {
				return (
					<div key={i} className="my-2">
						<div className="my-2 flex justify-between">
							<h4 className="font-medium">Property {i + 1}</h4>
							<BorderedBtn handleClick={removeProperty}>-</BorderedBtn>
						</div>

						<div className="my-2 overflow-hidden rounded-md border border-solid border-gray-300">
							<input
								className="w-full px-4 py-2 outline-none"
								placeholder="property name"
								type="text"
								onChange={event => setPropertyName(event.target.value, i)}
								value={property.name}
							/>
						</div>
						<div className="my-2 overflow-hidden rounded-md border border-solid border-gray-300">
							<input
								className="w-full px-4 py-2 outline-none"
								placeholder="property value"
								type="text"
								onChange={event => setPropertyValue(event.target.value, i)}
								value={property.value}
							/>
						</div>
					</div>
				)
			})}
		</div>
	)
}

export default PropertyFields
