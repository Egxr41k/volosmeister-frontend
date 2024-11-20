import ServerImage from '@/components/ServerImage'
import BorderedBtn from '@/components/btns/BorderedBtn'
import { Controller, useFieldArray } from 'react-hook-form'
import { IFormField } from './form.types'

const FeaturesFields = ({ control, register }: IFormField) => {
	const {
		fields: featureFields,
		append: appendFeature,
		remove: removeFeature
	} = useFieldArray({
		control,
		name: 'features'
	})

	return (
		<div className="my-2">
			<div className="flex justify-between">
				<h2 className="my-auto text-xl font-semibold">
					{featureFields.length ? 'Оновити cекції' : 'Додати cекції'}
				</h2>
				<BorderedBtn
					handleClick={() =>
						appendFeature({
							title: '',
							image: '',
							description: ''
						})
					}
				>
					+
				</BorderedBtn>
			</div>

			{featureFields.map((feature, index) => (
				<div key={feature.id} className="my-2">
					<div className="my-2 flex justify-between">
						<h4 className="font-medium">Ceкція {index + 1}</h4>
						<BorderedBtn handleClick={() => removeFeature(index)}>
							-
						</BorderedBtn>
					</div>
					<Controller
						name={`features.${index}.image`}
						control={control}
						render={({ field }) => (
							<>
								<div className="h-72">
									<ServerImage imageSrc={field.value} />
								</div>
								<input
									className="my-2 w-48 rounded-lg border border-solid border-gray-300"
									placeholder="послання на зображення"
									type="text"
									{...field}
								/>
							</>
						)}
					/>
					<input
						className="my-2 w-48 rounded-lg border border-solid border-gray-300"
						placeholder="назва"
						{...register(`features.${index}.title`)}
					/>
					<textarea
						className="my-2 h-20 w-full"
						placeholder="опис"
						{...register(`features.${index}.description`)}
					/>
				</div>
			))}
		</div>
	)
}

export default FeaturesFields
