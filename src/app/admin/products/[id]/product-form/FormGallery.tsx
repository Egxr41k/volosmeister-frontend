import { SetStateAction, useState } from 'react'
import ImageInput from './ImageInput'

interface IFormGallery {
	productImages: string[]
	setProductImages: (value: string[]) => void
	productImageFiles: (File | undefined)[]
	setProductImageFiles: (value: SetStateAction<(File | undefined)[]>) => void
}

export function FormGallery({
	productImages,
	setProductImages,
	productImageFiles,
	setProductImageFiles
}: IFormGallery) {
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
	return (
		<div>
			<ImageInput
				image={productImages[activeIndex]}
				onChange={(image: string) => setProductImageToPos(image, activeIndex)}
				file={productImageFiles[activeIndex]}
				onFileChange={(file: File | undefined) =>
					setProductImageFileToPos(file, activeIndex)
				}
			/>
			<div
				className="mt-6"
				style={{ width: '500px', overflowX: 'auto', whiteSpace: 'nowrap' }}
			>
				{productImages.map((image: string, index: number) => (
					<button
						key={image}
						onClick={() => setActiveIndex(index)}
						className={[
							'mr-5 inline overflow-hidden rounded-lg border-b-2 border-solid transition-all duration-300 last:mr-0 hover:shadow-md',
							index === activeIndex
								? 'border-primary shadow-md'
								: 'border-transparent'
						].join(' ')}
					>
						<img
							src={image}
							alt=""
							className="h-20 w-20 rounded-lg object-cover"
							draggable={false}
						/>
					</button>
				))}
				<button className="ml-2 rounded-lg bg-gray-200 px-4 py-2">
					+ Добавить
				</button>
			</div>
		</div>
	)
}
