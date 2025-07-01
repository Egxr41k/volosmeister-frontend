import Image from 'next/image'
import { useState } from 'react'

interface IProductGallery {
	images: string[]
}

export function ProductGallery({ images }: IProductGallery) {
	const [activeIndex, setActiveIndex] = useState(0)

	return (
		<div className="w-full">
			<div className="mx-auto w-full max-w-[500px]">
				<Image
					src={images[activeIndex]}
					alt=""
					width={500}
					height={500}
					className="mx-auto aspect-square h-auto w-full rounded-lg bg-white object-contain"
					priority
					draggable={false}
					unoptimized
				/>
			</div>

			<div className="mt-6 flex w-full justify-center gap-5 lg:justify-start">
				{images.map((image, index) => (
					<button
						key={index}
						onClick={() => setActiveIndex(index)}
						className="flex-shrink-0"
					>
						<Image
							src={image}
							alt=""
							width={100}
							height={100}
							className={`h-[80px] w-[80px] rounded-lg border-b-2 bg-white object-contain transition-colors duration-300 sm:h-[100px] sm:w-[100px] ${
								index === activeIndex
									? 'border-emerald-500'
									: 'border-transparent'
							}`}
							priority
							draggable={false}
							unoptimized
						/>
					</button>
				))}
			</div>
		</div>
	)
}
