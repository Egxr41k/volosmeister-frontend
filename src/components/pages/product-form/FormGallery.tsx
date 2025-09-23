import { SetStateAction, useState } from 'react'
import ImageInput from './ImageInput'

interface IFormGallery {
	productImages: string[]
	setProductImages: (value: string[]) => void
	productImageFiles: (File | undefined)[]
	setProductImageFiles: (value: SetStateAction<(File | undefined)[]>) => void
}

const FormGallery = ({
	productImages,
	setProductImages,
	productImageFiles,
	setProductImageFiles
}: IFormGallery) => {
	const [activeIndex, setActiveIndex] = useState(0)

	const setProductImageFileToPos = (image: File | undefined, i: number) => {
		const newImages = [...productImageFiles]
		if (image) newImages[i] = image
		else return
		setProductImageFiles(newImages)
	}

	const setProductImageToPos = (image: string, i: number) => {
		const newImages = [...productImages]
		if (image) newImages[i] = image
		else return
		setProductImages(newImages)
	}

	const addProductImage = () => {
		setProductImages([...productImages, ''])
		setProductImageFiles([...productImageFiles, undefined])

		setActiveIndex(productImages.length)
	}

	const removeProductImage = (i: number) => {
		const newImages = productImages.filter((_, index) => index !== i)
		setProductImages(newImages)

		const newFiles = productImageFiles.filter((_, index) => index !== i)
		setProductImageFiles(newFiles)
		setActiveIndex(activeIndex - 1)
	}

	return (
		<div>
			{productImages.length !== 0 && (
				<ImageInput
					image={productImages[activeIndex] ?? ''}
					onChange={(image: string) => setProductImageToPos(image, activeIndex)}
					file={productImageFiles[activeIndex]}
					onFileChange={(file: File | undefined) =>
						setProductImageFileToPos(file, activeIndex)
					}
				/>
			)}
			<div
				className="my-2"
				style={{ width: '500px', overflowX: 'auto', whiteSpace: 'nowrap' }}
			>
				{productImages.map((image: string, index: number) => (
					<button
						key={image}
						onClick={() => setActiveIndex(index)}
						className={[
							'mr-5 inline overflow-hidden rounded-lg border-b-2 border-solid transition-all duration-300 last:mr-0 hover:shadow-md',
							index === activeIndex
								? 'border-emerald-500 shadow-md'
								: 'border-transparent'
						].join(' ')}
					>
						<img
							src={image}
							alt=""
							className="h-20 w-20 rounded-lg object-contain"
							draggable={false}
						/>
					</button>
				))}
				<div className="my-2 flex gap-5">
					<button
						className="rounded-lg bg-gray-200 px-4 py-2"
						onClick={addProductImage}
					>
						+ Add
					</button>
					<button
						className="rounded-lg bg-gray-200 px-4 py-2"
						onClick={() => removeProductImage(activeIndex)}
					>
						- Remove selected
					</button>
				</div>
			</div>
		</div>
	)
}

export default FormGallery
