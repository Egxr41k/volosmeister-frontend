import BorderedBtn from '@/components/btns/BorderedBtn'
import { useFieldArray } from 'react-hook-form'
import { IFormField } from './form.types'

const PropertyFields = ({ control, register }: IFormField) => {
	const {
		fields: propertyFields,
		append: appendProperty,
		remove: removeProperty
	} = useFieldArray({
		control,
		name: 'properties'
	})

	return (
		<div className="my-2">
			<div className="flex justify-between">
				<h2 className="my-auto text-lg font-semibold">
					{propertyFields.length
						? 'Оновити характеристики'
						: 'Додати характеристики'}
				</h2>
				<BorderedBtn
					handleClick={() =>
						appendProperty({
							name: '',
							value: ''
						})
					}
				>
					+
				</BorderedBtn>
			</div>

			{propertyFields.map((property, index) => (
				<div key={property.id} className="my-2">
					<div className="my-2 flex justify-between">
						<h4 className="font-medium">Характеристика {index + 1}</h4>
						<BorderedBtn handleClick={() => removeProperty(index)}>
							-
						</BorderedBtn>
					</div>
					<input
						className="my-2 w-32 rounded-lg border border-solid border-gray-300"
						placeholder="назва"
						{...register(`properties.${index}.name`)}
					/>
					<input
						className="my-2 w-32 rounded-lg border border-solid border-gray-300"
						placeholder="значення"
						{...register(`properties.${index}.value`)}
					/>
				</div>
			))}
		</div>
	)
}

export default PropertyFields
