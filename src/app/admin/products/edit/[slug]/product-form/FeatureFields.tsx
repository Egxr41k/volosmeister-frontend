import { IFeature } from '@/types/feature.interface'
import BorderedBtn from '@/ui/button/BorderedBtn'
import { SetStateAction } from 'react'
import ImageInput from './ImageInput'

interface IFeatureFeilds {
	features: IFeature[]
	setFeatures: (value: IFeature[]) => void
	featureImageFiles: (File | undefined)[]
	setFeatureImageFiles: (value: SetStateAction<(File | undefined)[]>) => void
}

const FeatureFields = ({
	features,
	setFeatures,
	featureImageFiles,
	setFeatureImageFiles
}: IFeatureFeilds) => {
	const appendFeature = () => {
		setFeatures([
			...features,
			{
				description: '',
				image: '',
				title: ''
			} as IFeature
		])
		setFeatureImageFiles(images => [...images, undefined])
	}

	const removeFeature = () => {
		setFeatures(features.filter((_, i) => i !== features.length - 1))
		setFeatureImageFiles(images =>
			images.filter((_, i) => i !== images.length - 1)
		)
	}
	const setFeatureImageFileToPos = (image: File | undefined, i: number) => {
		const newImages = [...featureImageFiles]
		if (image) newImages[i] = image
		else return
		setFeatureImageFiles(newImages)
	}

	const setFeatureImageToPos = (image: string, i: number) => {
		const newFeatures = [...features]
		newFeatures[i].image = image

		setFeatures(newFeatures)
	}

	const setFeatureTitle = (value: string, i: number) => {
		const newFeatures = [...features]
		newFeatures[i].title = value

		setFeatures(newFeatures)
	}

	const setFeatureDescription = (value: string, i: number) => {
		const newFeatures = [...features]
		newFeatures[i].description = value

		setFeatures(newFeatures)
	}

	return (
		<div className="my-2">
			<div className="flex justify-between">
				<h2 className="my-auto text-xl font-semibold">
					{features.length != 0 ? 'Update fearures' : 'Add features'}
				</h2>
				<BorderedBtn handleClick={appendFeature}>+</BorderedBtn>
			</div>

			{features.map((feature: IFeature, i: number) => {
				return (
					<div key={i} className="my-2">
						<div className="my-2 flex justify-between">
							<h4 className="font-medium">Feature {i + 1}</h4>
							<BorderedBtn handleClick={removeFeature}>-</BorderedBtn>
						</div>
						<ImageInput
							image={feature.image}
							onChange={value => setFeatureImageToPos(value, i)}
							file={featureImageFiles[i]}
							onFileChange={(file: File | undefined) => {
								setFeatureImageFileToPos(file, i)
							}}
						/>
						<div className="my-2 overflow-hidden rounded-md border border-solid border-gray-300">
							<input
								className="w-full px-4 py-2 outline-none"
								placeholder="feature title"
								type="text"
								onChange={event => setFeatureTitle(event.target.value, i)}
								value={feature.title}
							/>
						</div>

						<div className="my-2 overflow-hidden rounded-md border border-solid border-gray-300">
							<textarea
								className="w-full px-4 py-2 outline-none"
								placeholder="feature description"
								onChange={event => {
									setFeatureDescription(event.target.value, i)
								}}
								value={feature.description}
							/>
						</div>
					</div>
				)
			})}
		</div>
	)
}

export default FeatureFields
